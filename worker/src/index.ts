// Cloudflare Worker — Stripe webhook → Resend email with PDF link
//
// When a customer completes a Stripe Checkout, Stripe POSTs to this Worker.
// We verify the signature, extract the buyer's email from the session,
// and ask Resend to email them a link to download the book PDF.
//
// Deploy: `wrangler deploy`. See SETUP.md for the full setup walkthrough.

export interface Env {
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  PDF_DOWNLOAD_URL: string;
  FROM_EMAIL: string;
  BOOK_TITLE: string;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

    const sig = req.headers.get("stripe-signature");
    const body = await req.text();
    if (!sig) return new Response("Missing signature", { status: 400 });

    const verified = await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET);
    if (!verified) return new Response("Bad signature", { status: 400 });

    const event = JSON.parse(body);

    if (event.type !== "checkout.session.completed") {
      return new Response("ok", { status: 200 });
    }

    const session = event.data.object;
    const email: string | undefined = session.customer_details?.email || session.customer_email;
    const name: string = session.customer_details?.name || "friend";

    if (!email) return new Response("No customer email", { status: 400 });

    const sendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [email],
        subject: `Your copy of ${env.BOOK_TITLE} is here`,
        html: emailHtml({ name, pdfUrl: env.PDF_DOWNLOAD_URL, title: env.BOOK_TITLE }),
      }),
    });

    if (!sendResp.ok) {
      const txt = await sendResp.text();
      console.error("Resend failed", sendResp.status, txt);
      return new Response("Email send failed", { status: 500 });
    }

    return new Response("ok", { status: 200 });
  },
};

function emailHtml({ name, pdfUrl, title }: { name: string; pdfUrl: string; title: string }) {
  return `<!doctype html>
<html><body style="font-family: Georgia, serif; max-width: 560px; margin: 40px auto; color: #333; line-height: 1.7;">
  <h1 style="font-weight: 400; font-size: 28px; color: #333; margin-bottom: 16px;">Thank you, ${escapeHtml(name)}.</h1>
  <p>Your copy of <em>${escapeHtml(title)}</em> is ready. Click below to download the PDF:</p>
  <p style="margin: 32px 0;">
    <a href="${pdfUrl}" style="display: inline-block; padding: 14px 28px; background: #bf9456; color: #fff; text-decoration: none; letter-spacing: 0.15em; text-transform: uppercase; font-size: 14px;">Download the Book</a>
  </p>
  <p style="color: #6b6b6b; font-size: 14px;">If the button doesn't work, copy this link into your browser:<br/><span style="word-break: break-all;">${pdfUrl}</span></p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;"/>
  <p style="color: #6b6b6b; font-size: 13px; font-style: italic;">100% of proceeds from this book go to humanitarian work in India and beyond. Thank you for being part of it.</p>
  <p style="color: #6b6b6b; font-size: 13px;">— Jo &amp; Tuula Barretto<br/>whywalkfly.com</p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

// Verify Stripe webhook signature using Web Crypto API (no Node deps).
async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  const parts = Object.fromEntries(sigHeader.split(",").map((kv) => kv.split("=")));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  // Reject events older than 5 minutes
  if (Math.abs(Math.floor(Date.now() / 1000) - parseInt(timestamp, 10)) > 300) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(`${timestamp}.${payload}`));
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

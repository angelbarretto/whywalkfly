# Why Walk? Fly! — Payment & Delivery Setup

The website is wired for paid book sales with **automatic PDF delivery by email**. This document walks you through the one-time setup. **Total time: ~45 minutes.**

## Architecture

```
Buyer clicks "Buy the Book — $10.10"
        ↓
Stripe Checkout (hosted page — cards, Apple Pay, Google Pay)
        ↓
Stripe sends webhook → Cloudflare Worker
        ↓
Worker calls Resend → emails buyer the PDF download link
```

**Monthly cost: $0** (all on free tiers). **Per sale: ~$0.30 Stripe fee.** You keep ~$9.80 per $10.10 sale.

---

## Step 1 — Host the PDF (5 min)

Put the book PDF somewhere with a public shareable link.

**Easiest: Google Drive.**
1. Upload `Why Walk Fly ebook by Jo Barretto.pdf` to Google Drive
2. Right-click the file → Share → "Anyone with the link" → Viewer
3. Copy the share link. It looks like `https://drive.google.com/file/d/ABC123.../view`
4. **Save this URL** — you'll paste it into Step 4 as `PDF_DOWNLOAD_URL`

⚠️ Anyone with the link can download the file. For a $10.10 book this is fine — same risk as the PDF itself.

---

## Step 2 — Sign up for Resend (5 min)

Resend sends the email with the PDF link.

1. Go to [resend.com](https://resend.com) and sign up (free, 3000 emails/month forever)
2. **Add and verify a domain** (e.g. `whywalkfly.com`):
   - Resend will show you 3 DNS records (SPF, DKIM, DMARC)
   - Add them at your domain registrar (GoDaddy, Cloudflare, etc.)
   - Wait ~10 minutes for verification
3. Once verified, create an API key: Resend dashboard → API Keys → Create
4. **Save this key** — you'll use it in Step 4 as `RESEND_API_KEY`

> **Tip:** If you don't want to verify a domain right away, you can send from `onboarding@resend.dev` for testing. Switch to your real domain before going live.

---

## Step 3 — Create the Stripe Payment Link (5 min)

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → **Payment links** → **+ New**
2. Add a product:
   - Name: `Why Walk? Fly! — eBook`
   - Price: `$10.10 USD`, one-time
   - Description: `24 true stories. Instant PDF delivery to your email.`
3. **Confirmation page** → "Show confirmation message" → paste:
   > Thank you! Your book is on its way to your inbox. Check spam if you don't see it within 2 minutes.
4. Save → copy the Payment Link URL (looks like `https://buy.stripe.com/abc123xyz`)
5. **Paste it into [src/config/links.ts](src/config/links.ts)** as `BUY_CHECKOUT_URL`:
   ```ts
   export const BUY_CHECKOUT_URL = "https://buy.stripe.com/abc123xyz";
   ```

---

## Step 4 — Deploy the Cloudflare Worker (15 min)

The worker is the small bit of backend code that bridges Stripe → Resend. Code lives in [worker/](worker/).

### 4a. Install wrangler (Cloudflare's CLI)

```bash
cd worker
npm install
```

Sign in to Cloudflare (free account):
```bash
npx wrangler login
```

### 4b. Set secrets

```bash
npx wrangler secret put STRIPE_WEBHOOK_SECRET   # paste later (see step 4d)
npx wrangler secret put RESEND_API_KEY           # paste the Resend key from Step 2
npx wrangler secret put PDF_DOWNLOAD_URL         # paste the Drive link from Step 1
npx wrangler secret put FROM_EMAIL               # e.g. "Jo Barretto <jo@whywalkfly.com>"
```

Each command will prompt you to paste the value.

### 4c. Deploy

```bash
npx wrangler deploy
```

You'll get a URL like `https://whywalkfly-stripe-webhook.YOUR-SUBDOMAIN.workers.dev`. **Save it.**

### 4d. Connect Stripe to the Worker

1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: paste the Worker URL from step 4c
3. Events to send: select only `checkout.session.completed`
4. Add endpoint → click into it → reveal the **Signing secret** (starts with `whsec_...`)
5. Copy it. Now set it as the worker secret:
   ```bash
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   # paste whsec_...
   ```
6. Redeploy: `npx wrangler deploy`

---

## Step 5 — Test it (5 min)

1. Use Stripe **test mode** first (toggle in dashboard top-right)
2. In test mode, create a separate Payment Link (Stripe keeps live and test mode separate)
3. Buy your own book with Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC
4. Check your inbox — the PDF email should arrive within 30 seconds

Once it works in test mode, switch Stripe to **live mode**, recreate the Payment Link there, and update [src/config/links.ts](src/config/links.ts) with the live URL.

---

## Going live checklist

- [ ] PDF hosted on Drive with public share link
- [ ] Resend domain verified, API key saved
- [ ] Stripe Payment Link created in **live mode**, URL pasted into `src/config/links.ts`
- [ ] Cloudflare Worker deployed with all 4 secrets set
- [ ] Stripe webhook pointing at live Worker URL with `checkout.session.completed` event
- [ ] Tested with test card, PDF arrived in inbox
- [ ] Site rebuilt + pushed to Loveable

## Maintenance

- **New book version?** Re-upload to Drive (same filename), no code change needed.
- **Change price?** Edit the Stripe Payment Link's price, and update the "$10.10" text in `Hero.tsx`, `Chapters.tsx`, `ReadFree.tsx`.
- **Email looks broken?** Edit `worker/src/index.ts` → `emailHtml()` → redeploy.

## Costs

| Service | Free tier | When you'd pay |
|---|---|---|
| **Stripe** | $0/month; 2.9% + 30¢ per sale | Always — that's their fee. |
| **Resend** | 3000 emails/month free | Past ~100 sales/day |
| **Cloudflare Workers** | 100k requests/day free | Never, at your volume |
| **Google Drive** | 15 GB free | Storage limit only |

At 10 sales/month: **$0 total fixed cost**, ~$3 Stripe fees, net ~$98/month.

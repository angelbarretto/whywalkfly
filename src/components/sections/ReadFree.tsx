import { useState } from "react";
import { BUY_CHECKOUT_URL } from "@/config/links";

export default function ReadFree() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribe", email);
    setSubmitted(true);
  };

  return (
    <section
      id="buy"
      className="relative block-section py-24 bg-cover bg-center text-white overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,20,30,0.55), rgba(0,0,0,0.85)), url('/clouds.jpg')",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div className="container max-w-2xl text-center relative z-10">
        <p className="eyebrow text-white/80 mb-6">The full book — $10.10 USD</p>
        <h2 className="font-serif text-white text-[40px] md:text-[55px] leading-tight mb-6">
          Twenty-four stories. All true.
        </h2>
        <p className="text-white/85 text-lg leading-relaxed mb-10">
          The first three chapters are free to read. Buy the full eBook and the
          PDF lands in your inbox within seconds. 100% of proceeds go to humanitarian
          work in India and beyond.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href={BUY_CHECKOUT_URL} className="btn-novela-hero">
            Buy the Book — $10.10
          </a>
          <a href="#contact" className="btn-novela-hero">
            Write to Jo
          </a>
        </div>

        <p className="text-white/60 text-sm mb-12 italic">
          Secure checkout via Stripe · Apple Pay · Google Pay · cards · PDF delivered instantly
        </p>

        <div className="border-t border-white/20 pt-12">
          <p className="eyebrow text-white/80 mb-4">Stay in touch</p>
          <p className="text-white/85 mb-6">
            New stories from Jo, delivered to your inbox occasionally.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8"
            aria-label="Subscribe for new stories"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3 bg-white/10 backdrop-blur border border-white/40 text-white placeholder:text-white/60 focus:outline-none focus:border-accent transition-colors"
            />
            <button type="submit" className="btn-novela-hero whitespace-nowrap">
              {submitted ? "Subscribed ✓" : "Send me stories"}
            </button>
          </form>
        </div>

        <p className="font-serif italic text-white/70 text-[16px] max-w-xl mx-auto mt-8">
          "Eyes have not seen, ears have not heard, you cannot even imagine the
          things which God has prepared for those that love Him."
        </p>
        <p className="eyebrow text-white/50 mt-4">— 1 Corinthians 2:9</p>
      </div>
    </section>
  );
}

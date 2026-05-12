import { BUY_CHECKOUT_URL } from "@/config/links";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full pb-16 bg-cover bg-center"
      style={{
        minHeight: "700px",
        paddingTop: "70px",
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundColor: "#0f172a",
      }}
    >
      <div className="hero-mask pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="text-white">
            <p className="eyebrow text-white/80 mb-6">A Memoir of Miracles</p>
            <h1 className="font-serif text-white text-[44px] sm:text-[55px] leading-[1.1] sm:leading-[70px] mb-6">
              Why Walk? Fly!
            </h1>
            <p className="subtitle text-white/90 mb-6">
              Coincidental Encounters… or Miracles? You decide.
            </p>
            <p className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl">
              Now that you have met me, your life will never be the same again.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#chapters" className="btn-novela-hero">
                Read Free Chapters
              </a>
              <a href={BUY_CHECKOUT_URL} className="btn-novela-hero">
                Buy the Book — $10.10
              </a>
            </div>
          </div>

          {/* Right — book cover (transparent PNG, no wrapper box) */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/book-cover.png"
              alt="Why Walk? Fly! book cover"
              className="w-[260px] sm:w-[320px] md:w-[400px] h-auto transform rotate-[6deg] hover:rotate-0 transition-transform duration-500"
              style={{
                filter: "drop-shadow(0 25px 40px rgba(0, 0, 0, 0.5))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

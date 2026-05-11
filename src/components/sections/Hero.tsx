export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen pt-[140px] pb-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,20,30,0.35), rgba(0,0,0,0.85)), url('/hero-bg.jpg')",
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
              <a href="#author" className="btn-novela-hero">
                Meet the Author
              </a>
            </div>
          </div>

          {/* Right — book cover */}
          <div className="flex justify-center md:justify-end">
            <div
              className="relative w-[260px] sm:w-[320px] md:w-[360px] aspect-[2/3] rounded-sm shadow-2xl transform rotate-[6deg] hover:rotate-0 transition-transform duration-500"
              style={{
                backgroundImage: "url('/book-cover.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#1a1a1a",
              }}
              aria-label="Why Walk? Fly! book cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

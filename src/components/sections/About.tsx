export default function About() {
  return (
    <section id="about" className="relative block-section overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[600px]">
        {/* LEFT — book information with drop-cap */}
        <div className="px-8 md:px-20 py-12 md:py-20 max-w-2xl mx-auto md:mx-0 flex flex-col justify-center">
          <p className="eyebrow">About the Book</p>
          <h2 className="font-serif text-[36px] md:text-[42px] leading-tight mb-8">
            Stories that defy explanation.
          </h2>

          <p className="drop-cap mb-6">
            I do not have a fat bank account, I drive an old car, and my wife is
            not the current Miss Finland. Yet, should Gallup produce a list of
            the "happiest and most contented" people on this planet, I would ask
            that they stick my name close to the very top!
          </p>

          <p className="mb-8 text-body">
            Twenty true stories — encounters that read like fiction but happened.
            Plane crashes, thieves who returned the cash, elephants who answered
            prayers, dead men who paid their debts. Coincidence, or something
            more?
          </p>

          <a href="#chapters" className="btn-novela self-start">
            Read the First Chapter
          </a>
        </div>

        {/* RIGHT — image fills column; pull-quote card floats top, overlapping left edge */}
        <div
          className="relative min-h-[500px] md:min-h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/about-bg.jpg')",
            backgroundColor: "#2a2a2a",
          }}
        >
          <div
            className="absolute z-10 bg-white shadow-xl text-center
                       px-8 md:px-12 py-10 md:py-14
                       top-12 md:top-16
                       left-6 md:-left-16
                       right-6 md:right-16"
          >
            <p className="font-serif italic text-[20px] leading-relaxed text-muted mb-4">
              "100% of any proceeds from this book go directly to our
              global humanitarian work."
            </p>
            <p className="eyebrow mb-0">— Jo Barretto</p>
          </div>
        </div>
      </div>
    </section>
  );
}

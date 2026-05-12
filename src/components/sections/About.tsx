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

        {/* RIGHT — book-read: image fills column. Card sits top-left at width 70% per theme SCSS */}
        <div
          className="relative min-h-[500px] md:min-h-full bg-cover bg-center text-center"
          style={{
            backgroundImage: "url('/about-bg.jpg')",
            backgroundColor: "#2a2a2a",
          }}
        >
          {/* book-read-inner: position relative, margin-top 40px, width 70%, padding 40px */}
          <div className="relative z-10 bg-white p-10 mt-10 w-[90%] md:w-[70%] shadow-xl">
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

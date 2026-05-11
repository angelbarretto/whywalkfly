export default function Author() {
  return (
    <section id="author" className="relative block-section overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[600px]">
        {/* LEFT — photo bleed */}
        <div
          className="relative min-h-[400px] md:min-h-full bg-cover order-1 md:order-1"
          style={{
            backgroundImage: "url('/author.jpg')",
            backgroundPosition: "top center",
            backgroundColor: "#2a2a2a",
          }}
        />

        {/* RIGHT — bio */}
        <div className="px-8 md:px-20 py-12 md:py-20 max-w-2xl mx-auto md:mx-0 order-2 md:order-2">
          <p className="eyebrow">The Author</p>
          <h2 className="font-serif text-[36px] md:text-[42px] leading-tight mb-4">
            Joaquim Barretto
          </h2>
          <p className="subtitle mb-10">
            Husband, father, accidental adventurer.
          </p>

          <p className="drop-cap mb-6">
            Joaquim and his Finnish wife Tuula have spent over forty years on
            humanitarian missions — serving impoverished children in India,
            business leaders in boardrooms, and broken hearts in between.
          </p>

          <p className="mb-8 text-body">
            They believe miracles are still possible — for the sick, the
            depressed, the poor, and the brokenhearted. This book is their
            evidence: twenty true stories, told plainly, from a life that kept
            being interrupted by something larger than itself.
          </p>

          <a href="#contact" className="btn-novela">
            Write to Joaquim
          </a>
        </div>
      </div>
    </section>
  );
}

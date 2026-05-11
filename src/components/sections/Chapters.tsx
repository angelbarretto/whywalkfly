import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Chapter = {
  number: string;
  title: string;
  teaser: string;
};

const CHAPTERS: Chapter[] = [
  { number: "01", title: "Hellfire vs Heaven", teaser: "Two visions of where we go. One terrified me. The other set me free." },
  { number: "02", title: "Horror Express Turns Paradise", teaser: "An overnight train through India, a stranger's prayer, a journey changed mid-track." },
  { number: "03", title: "Finding Jimmy", teaser: "He was lost to the streets. We weren't supposed to find him. We did." },
  { number: "04", title: "Visitor from Heaven", teaser: "My 21st birthday. The first time I saw the inside of a mortuary. The first time I knew." },
  { number: "05", title: "Plane Crash", teaser: "An hour into the flight, I felt a nudge in my heart prompting me to talk to the pilot…" },
  { number: "06", title: "Marry Me!", teaser: "Tuula said yes before I asked. So did Heaven." },
  { number: "07", title: "Heart Adventures", teaser: "The doctors said weeks. That was decades ago." },
  { number: "08", title: "Raise the Dead?!", teaser: "I'm not making this up. I wish I had a better word than 'miracle' to describe it." },
  { number: "09", title: "My Father is Rich", teaser: "He owns the cattle on a thousand hills. Apparently He owns taxi fares in Mumbai too." },
  { number: "10", title: "Mechanical Prayer", teaser: "The car wouldn't start. Then it would. Then it wouldn't again. The mechanic just stared." },
  { number: "11", title: "Elephant to the Rescue", teaser: "Goa, monsoon season. A four-ton answer to a child's prayer." },
  { number: "12", title: "Viking Line", teaser: "A ferry between Helsinki and Stockholm. A storm. A stranger who knew my name." },
  { number: "13", title: "Pearl in the Tsunami", teaser: "Christmas 2004. We lost almost everything. What we kept was worth more." },
  { number: "14", title: "Dead Man Pays Back", teaser: "He owed us money. He died. The cheque came anyway." },
  { number: "15", title: "Thief Returns Cash", teaser: "The crook in Mumbai had cheated me of 280 Euros. With thousands of taxis at Dadar station, what were the odds?" },
  { number: "16", title: "Signs: Orlando", teaser: "Three signs. One city. We almost missed all of them." },
  { number: "17", title: "Ghost Chasers", teaser: "Some doors should stay closed. We learned why." },
  { number: "18", title: "West Gate Terrace", teaser: "An address we had never been to. A door we had never seen. Already open." },
  { number: "19", title: "Magical Prayer", teaser: "Words are cheap. These ones weren't." },
  { number: "20", title: "Wiser Than Solomon", teaser: "A child asked the question. The answer is still unfolding." },
];

export default function Chapters() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIdx, setSelectedIdx] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="chapters"
      className="relative block-section py-[120px] bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: "url('/chapters-bg.jpg')",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div className="gradient-mask" />

      <div className="relative z-10 container px-4 md:px-10">
        <h2 className="characters-heading mb-16">Twenty stories. All true.</h2>

        <div className="bg-white max-w-5xl mx-auto p-8 md:p-20 shadow-2xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {CHAPTERS.map((chapter) => (
                <div
                  key={chapter.number}
                  className="flex-[0_0_100%] min-w-0 px-2"
                >
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="md:w-1/3 text-center md:text-left">
                      <p className="font-serif text-accent text-[80px] leading-none mb-2">
                        {chapter.number}
                      </p>
                      <p className="eyebrow">Chapter</p>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="font-serif text-[28px] md:text-[32px] leading-tight mb-6 text-heading">
                        {chapter.title}
                      </h3>
                      <p className="drop-cap text-body leading-relaxed">
                        {chapter.teaser}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / next + counter */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous chapter"
              className="text-heading hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={1.25} />
            </button>
            <span className="font-serif italic text-muted text-[18px] tabular-nums">
              {String(selectedIdx + 1).padStart(2, "0")} / {CHAPTERS.length}
            </span>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next chapter"
              className="text-heading hover:text-accent transition-colors"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

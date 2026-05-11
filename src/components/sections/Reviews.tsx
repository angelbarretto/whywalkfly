import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Review = {
  quote: string;
  attribution: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "It's intense… a lot to take in. It almost feels like a movie.",
    attribution: "Reader",
  },
  {
    quote:
      "Both Chapter 3 and Chapter 4 brought tears to my eyes. God was certainly with you every step.",
    attribution: "Reader",
  },
  {
    quote:
      "I read the first three stories. Overall it's very beautiful and inspiring.",
    attribution: "Reader",
  },
  {
    quote:
      "The website looks amazing! You guys are awesome and inspiring!",
    attribution: "Reader",
  },
];

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
      id="reviews"
      className="block-section"
      style={{ backgroundColor: "#fbfaf7" }}
    >
      <div className="container max-w-3xl">
        <div className="section-heading">
          <p className="eyebrow">What Readers Are Saying</p>
          <h2 className="font-serif">Let the people do the talking.</h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {REVIEWS.map((review, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 px-2 text-center">
                <Quote
                  className="w-12 h-12 mx-auto mb-6 text-accent opacity-40"
                  strokeWidth={1.25}
                />
                <p className="font-serif italic text-[22px] md:text-[24px] leading-relaxed text-body mb-8">
                  {review.quote}
                </p>
                <p className="eyebrow mb-0">— {review.attribution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous review"
            className="text-heading hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={1.25} />
          </button>
          <span className="font-serif italic text-muted text-[16px] tabular-nums">
            {String(selectedIdx + 1).padStart(2, "0")} / {REVIEWS.length}
          </span>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next review"
            className="text-heading hover:text-accent transition-colors"
          >
            <ChevronRight className="w-7 h-7" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </section>
  );
}

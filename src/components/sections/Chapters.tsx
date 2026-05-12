import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { CHAPTERS, FREE_CHAPTERS } from "@/data/chapters";
import { BUY_CHECKOUT_URL } from "@/config/links";

type FlipBookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    getPageCount: () => number;
  };
};

export default function Chapters() {
  const bookRef = useRef<FlipBookRef | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const flipNext = () => bookRef.current?.pageFlip().flipNext();
  const flipPrev = () => bookRef.current?.pageFlip().flipPrev();

  // Build the flat page list: cover + (chapter title + body pages) * 3 + buy CTA page
  const flipPages: { kind: "cover" | "chapter-title" | "body" | "buy"; chapter?: typeof FREE_CHAPTERS[0]; text?: string }[] = [
    { kind: "cover" },
  ];
  FREE_CHAPTERS.forEach((ch) => {
    flipPages.push({ kind: "chapter-title", chapter: ch });
    ch.pages.forEach((text) => flipPages.push({ kind: "body", chapter: ch, text }));
  });
  flipPages.push({ kind: "buy" });

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
        <h2 className="characters-heading mb-4">Twenty-four stories. All true.</h2>
        <p className="text-center text-white/80 italic font-serif text-lg mb-12">
          Read the first three chapters free. Flip the pages.
        </p>

        {/* Flipbook */}
        <div className="flex justify-center mb-12">
          <HTMLFlipBook
            ref={bookRef as unknown as React.RefObject<HTMLDivElement>}
            width={420}
            height={580}
            size="stretch"
            minWidth={300}
            maxWidth={500}
            minHeight={420}
            maxHeight={680}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="shadow-2xl"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={700}
            usePortrait={true}
            startZIndex={0}
            autoSize={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={(e: { data: number }) => setPageIndex(e.data)}
            onInit={() => {
              if (bookRef.current) setPageCount(bookRef.current.pageFlip().getPageCount());
            }}
          >
            {flipPages.map((p, i) => (
              <div
                key={i}
                className="bg-[#fdfaf4] border border-[#e8dfc8] p-8 md:p-10 flex flex-col"
                style={{ boxShadow: "inset 0 0 60px rgba(120, 80, 20, 0.08)" }}
              >
                {p.kind === "cover" && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="eyebrow text-muted mb-4">A Memoir of Miracles</p>
                    <h3 className="font-serif text-[36px] md:text-[44px] leading-tight mb-6 text-heading">
                      Why Walk? Fly!
                    </h3>
                    <div className="w-16 h-px bg-accent mb-6" />
                    <p className="font-serif italic text-muted text-lg mb-2">Jo Barretto</p>
                    <p className="text-muted text-sm mt-auto">Turn the page →</p>
                  </div>
                )}
                {p.kind === "chapter-title" && p.chapter && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="eyebrow text-muted mb-4">Chapter {p.chapter.number}</p>
                    <h3 className="font-serif text-[32px] md:text-[38px] leading-tight mb-8 text-heading">
                      {p.chapter.title}
                    </h3>
                    <div className="w-12 h-px bg-accent mb-8" />
                    <p className="font-serif italic text-muted text-[15px] leading-relaxed max-w-xs">
                      {p.chapter.epigraph}
                    </p>
                  </div>
                )}
                {p.kind === "body" && p.text && (
                  <div className="font-serif text-body text-[15px] leading-[1.7] whitespace-pre-line overflow-hidden">
                    {p.text}
                  </div>
                )}
                {p.kind === "buy" && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="eyebrow text-muted mb-4">End of preview</p>
                    <h3 className="font-serif text-[28px] md:text-[32px] leading-tight mb-6 text-heading">
                      Twenty-one more stories await.
                    </h3>
                    <p className="text-body text-[15px] leading-relaxed mb-8 max-w-xs">
                      Plane crashes, elephants, dead men paying back, ghosts, miracle apartments. Continue reading the full book.
                    </p>
                    <a href={BUY_CHECKOUT_URL} className="btn-novela">
                      Buy the Book — $10.10
                    </a>
                    <p className="text-muted text-xs mt-6 italic">
                      100% of proceeds go to humanitarian work.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* Flipbook controls */}
        <div className="flex items-center justify-center gap-8 mb-20">
          <button
            type="button"
            onClick={flipPrev}
            aria-label="Previous page"
            className="text-white hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-8 h-8" strokeWidth={1.25} />
          </button>
          <span className="font-serif italic text-white/70 text-[16px] tabular-nums">
            {String(pageIndex + 1).padStart(2, "0")} / {String(pageCount || flipPages.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={flipNext}
            aria-label="Next page"
            className="text-white hover:text-accent transition-colors"
          >
            <ChevronRight className="w-8 h-8" strokeWidth={1.25} />
          </button>
        </div>

        {/* Locked chapter list */}
        <div className="max-w-3xl mx-auto bg-white/95 p-8 md:p-14 shadow-2xl">
          <p className="eyebrow text-center mb-3">All twenty-four chapters</p>
          <h3 className="font-serif text-[28px] md:text-[32px] leading-tight text-center mb-10 text-heading">
            The complete table of contents
          </h3>
          <ul className="space-y-3">
            {CHAPTERS.map((chapter) => (
              <li
                key={chapter.number}
                className="flex items-start gap-4 py-3 border-b border-rule last:border-0"
              >
                <span className="font-serif text-accent text-[20px] tabular-nums shrink-0 pt-0.5">
                  {chapter.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-heading text-[17px] leading-snug">
                    {chapter.title}
                  </p>
                  <p className="text-muted text-[14px] leading-snug mt-1">
                    {chapter.teaser}
                  </p>
                </div>
                {chapter.locked && (
                  <Lock className="w-4 h-4 text-muted shrink-0 mt-1.5" strokeWidth={1.5} />
                )}
              </li>
            ))}
          </ul>

          <div className="text-center mt-10">
            <a href={BUY_CHECKOUT_URL} className="btn-novela">
              Unlock All Chapters — $10.10
            </a>
            <p className="text-muted text-[13px] italic mt-4">
              Instant PDF delivery to your inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

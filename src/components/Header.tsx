import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "The Book", href: "#about" },
  { label: "Chapters", href: "#chapters" },
  { label: "Author", href: "#author" },
  { label: "Reviews", href: "#reviews" },
  { label: "Buy the Book", href: "#buy" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-6">
          <a
            href="#hero"
            className={`font-serif text-xl tracking-[0.3em] uppercase ${
              scrolled ? "text-heading" : "text-white"
            }`}
          >
            Why&nbsp;Walk?&nbsp;Fly!
          </a>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`p-2 transition-colors ${
              scrolled ? "text-heading hover:text-accent" : "text-white hover:text-accent"
            }`}
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Right-side slide-out drawer (Novela "sb-slidebar sb-right") */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/40" />
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Site navigation"
        >
          <div className="flex justify-end p-6">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-heading hover:text-accent"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          <div className="px-10 pt-8">
            <p className="eyebrow">Jo Barretto</p>
            <h2 className="font-serif text-3xl text-heading">Why Walk? Fly!</h2>
          </div>

          <nav className="px-10 pt-12">
            <ul className="space-y-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl text-heading hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

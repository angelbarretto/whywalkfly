import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-10 text-[14px] tracking-[0.04em] text-body">
      <div className="container">
        <div className="mb-5 flex justify-center gap-6">
          <a
            href="mailto:famcaregoa@gmail.com"
            aria-label="Email"
            className="text-heading hover:text-accent"
          >
            <Mail className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-heading hover:text-accent"
          >
            <Facebook className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-heading hover:text-accent"
          >
            <Instagram className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-heading hover:text-accent"
          >
            <Youtube className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </div>

        <p>
          &copy; {new Date().getFullYear()} Why Walk? Fly! &middot; Jo Barretto
        </p>
        <p className="mt-2 italic text-muted">
          100% of any proceeds go to our global humanitarian work.
        </p>
      </div>
    </footer>
  );
}

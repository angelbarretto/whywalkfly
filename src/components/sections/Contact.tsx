import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Contact form", form);
    setSent(true);
  };

  return (
    <section id="contact" className="block-section">
      <div className="container max-w-3xl">
        <div className="section-heading">
          <p className="eyebrow">Get in touch</p>
          <h2 className="font-serif">Write to Jo &amp; Tuula.</h2>
        </div>

        {sent ? (
          <div className="text-center py-12">
            <p className="font-serif italic text-[22px] text-body mb-4">
              Thank you. Your message has been sent.
            </p>
            <p className="text-muted">We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-20 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-transparent border-0 border-b border-rule focus:border-accent focus:outline-none py-3 text-body placeholder:text-muted transition-colors"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="w-full bg-transparent border-0 border-b border-rule focus:border-accent focus:outline-none py-3 text-body placeholder:text-muted transition-colors"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Write your message…"
              className="w-full bg-transparent border-0 border-b border-rule focus:border-accent focus:outline-none py-3 text-body placeholder:text-muted transition-colors resize-none"
            />
            <div className="text-center pt-4">
              <button type="submit" className="btn-novela">
                Send Message
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <Phone
              className="w-6 h-6 mx-auto text-accent mb-4"
              strokeWidth={1.5}
            />
            <p className="font-serif italic text-body">+91 9822175807</p>
          </div>
          <div>
            <Mail className="w-6 h-6 mx-auto text-accent mb-4" strokeWidth={1.5} />
            <a
              href="mailto:famcaregoa@gmail.com"
              className="font-serif italic text-body hover:text-accent"
            >
              famcaregoa@gmail.com
            </a>
          </div>
          <div>
            <MapPin
              className="w-6 h-6 mx-auto text-accent mb-4"
              strokeWidth={1.5}
            />
            <p className="font-serif italic text-body">Goa, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}

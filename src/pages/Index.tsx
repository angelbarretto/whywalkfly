import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Chapters from "@/components/sections/Chapters";
import Author from "@/components/sections/Author";
import Reviews from "@/components/sections/Reviews";
import ReadFree from "@/components/sections/ReadFree";
import Contact from "@/components/sections/Contact";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Chapters />
        <Author />
        <Reviews />
        <ReadFree />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

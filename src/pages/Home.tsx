import Hero from "@/components/home/Hero";
import Service from "@/components/home/Service";
import { Footer } from "@/components/layout";

const Home = () => {
  return (
    <>
      <section id="hero" className="h-full -z-20">
        <Hero />
      </section>

      <section id="section2" className="z-10 relative bg-dull-black">
        <Service />
      </section>
      <Footer />
    </>
  );
};

export default Home;

import Hero from "@/components/home/Hero";
import Section2 from "@/components/home/Section2";

const Home = () => {
  return (
    <>
      <section id="hero" className="h-full -z-20">
        <Hero />
      </section>

      <section id="section2" className="z-10 relative bg-dull-black">
        <Section2 />
      </section>
    </>
  );
};

export default Home;

import Hero from "@/components/home/Hero";
import Section2 from "@/components/home/Section2";
import NoiseBg from "@/components/ui/NoiseBg";

const Home = () => {
  return (
    <>
      <section id="hero" className="h-full -z-20">
        <Hero />
      </section>

      <section id="section2" className="z-10 relative bg-dull-black">
        <div className="absolute top-0 w-full h-full pointer-events-none z-50 opacity-20">
          <div className="sticky top-0 h-dvh">
            <NoiseBg className="div" opacity={10} />
          </div>
        </div>
        <Section2 />
        <div className="h-96"></div>
      </section>
    </>
  );
};

export default Home;

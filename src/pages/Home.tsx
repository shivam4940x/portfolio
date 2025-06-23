import Hero from "@/components/home/Hero";
import Last from "@/components/home/Last";
import Service from "@/components/home/Service";

const Home = () => {
  return (
    <>
      <section id="Hero" className="h-full -z-20">
        <Hero />
      </section>

      <section id="Service" className="z-10 relative bg-dull-black">
        <Service />
      </section>
      <section id="Last" className="z-0 relative">
        <Last />
      </section>
    </>
  );
};

export default Home;

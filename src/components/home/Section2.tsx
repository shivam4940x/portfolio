import TextIn from "../anim/TextIn";
import NoiseBg from "../ui/NoiseBg";

const Section2 = () => {
  const data = [
    {
      heading: "Web Developer",
      para: "A website designed to captivate and convert can elevate your brand to new heights. My custom-coded sites are meticulously crafted to reflect your unique identity, delivering seamless experiences with a focus on animation — keeping your audience engaged and returning.",
      list: ["Creative Websites", "Full Stack Web Apps", "Motion & Animations"],
    },
    {
      heading: "Frontend Expert",
      para: "Specializing in modern, performant, and scalable frontend applications.",
      list: ["React.js", "TailwindCSS", "GSAP/Anime.js"],
    },
    {
      heading: "Backend Architect",
      para: "Reliable server-side systems with clean API design and secure data handling.",
      list: ["Node.js", "Prisma", "PostgreSQL"],
    },
    {
      heading: "Design-Centric",
      para: "Building UI that feels intuitive, engaging, and brand-consistent.",
      list: ["Figma to Code", "Design Systems", "Interaction Design"],
    },
  ];

  return (
    <div className="relative md:py-10 py-4 border-t border-mute-white/50 bg-dull-black ">
      {/* Noise Background */}
      <div className="absolute top-0 w-full h-full pointer-events-none z-50 opacity-20">
        <div className="sticky top-0 h-dvh">
          <NoiseBg className="div" opacity={10} />
        </div>
      </div>

      {/* Intro */}
      <div className="px-4 md:px-10 max-w-screen-xl mx-auto">
        <div className="space-y-6 md:space-y-10">
          <h1
            style={{ wordSpacing: "3px" }}
            className="tracking-tighter uppercase font-bold text-mute-white/90 text-[clamp(2rem,6vw,7.5rem)]"
          >
            <TextIn>How I can help you</TextIn>
          </h1>
          <div className="md:w-10/12 md:ml-20">
            <div className="text-base md:text-xl max-w-lg ml-auto">
              <TextIn TextStagger={false} delay={400}>
                Frustrated with websites that don't reflect your brand or drive
                growth? I craft premium web experiences that captivate and help
                you focus on growing your business.
              </TextIn>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Sections */}
      {data.map(({ heading, para, list }, index) => {
        const top = 150 * index;
        return (
          <div
            key={`${heading}_${index}`}
            className="sticky mb-80 last:mb-20"
            style={{ top: `${top}px` }}
          >
            <div className="mx-4 md:mx-6 border-t border-white/20 py-4 bg-dull-black grid grid-cols-1 md:grid-cols-5 gap-y-10 items-start">
              <div className="font-pixel text-3xl  col-span-2 hidden md:block h-40 center w-max">
                ({index + 1})
              </div>
              <div className="col-span-1 md:col-span-3 space-y-6">
                <h2 className="text-[clamp(2rem,5vw,4.5rem)] h-40 font-bold tracking-tighter text-mute-white/95 flex items-center gap-3">
                  <div className="font-pixel text-2xl md:hidden">
                    ({index + 1})
                  </div>
                  <TextIn alternative>{heading}</TextIn>
                </h2>
                <div className="text-base md:text-xl text-mute-white/80">
                  <TextIn TextStagger={false} delay={400}>
                    {para}
                  </TextIn>
                </div>
                <ul className="space-y-4">
                  {list.map((l, idx) => (
                    <li
                      key={`${l}_${idx}`}
                      className="flex items-center gap-4 border-b border-white/10 pb-2"
                    >
                      <div className="text-lg font-bold text-white">
                        0{idx + 1}.
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-mute-white/70">
                        {l}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Section2;

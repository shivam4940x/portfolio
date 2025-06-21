import { useEffect, useState } from "react";
import TextIn from "../anim/TextIn";
const data = [
  {
    heading: "Web Developer",
    para: "I craft visually compelling websites engineered to convert and resonate with your audience. Every line of code is tailored to reflect your brand’s identity, with seamless UI and motion-driven interactivity that keeps users engaged and returning.",
    list: ["Custom Websites", "Full Stack Web Apps", "Interactive Animations"],
  },
  {
    heading: "Frontend Expert",
    para: "Focused on building high-performance, scalable UIs using cutting-edge tools and best practices. I work with modern frameworks and libraries to bring interfaces to life with precision and style.",
    list: ["Next.js", "TailwindCSS", "GSAP / Anime.js"],
  },
  {
    heading: "Backend Developer",
    para: "I develop robust backend systems with clear architecture, secure data flows, and scalable APIs — ensuring everything runs fast, clean, and reliably under the hood.",
    list: ["Node.js", "TypeScript", "Nest.js"],
  },
];

const Section2 = () => {
  const [h2Height, setH2Height] = useState(0);
  useEffect(() => {
    const getHeight = () => {
      const h2 = document.querySelector(".service h2") as HTMLElement;
      if (!h2) return;

      const { height } = h2.getBoundingClientRect();
      setH2Height(height);
    };
    window.onresize = getHeight;
    getHeight();
  }, []);
  return (
    <div className="relative md:py-10 py-4 border-t border-mute-white/50 bg-dull-black px-3 md:px-10">
      {/* Intro */}
      <div className="w-full mb-4 md:mb-0">
        <div className="py-2 md:py-6 ">
          <h1
            style={{ wordSpacing: "3px" }}
            className="tracking-tight uppercase font-bold text-mute-white/90 text-[clamp(2rem,7vw,7.5rem)]"
          >
            <TextIn>How I can help you</TextIn>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-10">
            <div className="col-span-4"></div>
            <div className="col-span-5 flex gap-5 flex-col lg:flex-row">
              <div className="text-lg mr-8">(services)</div>
              <div className="text-base md:text-2xl font-medium ">
                <TextIn TextStagger={false} delay={400}>
                  Frustrated with websites that don't reflect your brand or
                  drive growth? I craft premium web experiences that captivate
                  and help you focus on growing your business.
                </TextIn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Sections */}
      {data.map(({ heading, para, list }, index) => {
        return (
          <div
            key={`${heading}_${index}`}
            className="sticky service"
            style={{ top: `${(h2Height + 10) * index}px` }}
          >
            <div className="border-t border-white/20 py-4 bg-dull-black grid grid-cols-1 lg:grid-cols-10 gap-y-10 items-start md:pb-80 pb-40">
              <div className="font-pixel text-5xl col-span-4 hidden lg:flex justify-center items-center w-max leading-19">
                ({index + 1})
              </div>
              <div className="col-span-1 md:col-span-6 ">
                <div className="text-mute-white/95 font-bold tracking-tight">
                  <h2 className="text-[clamp(2rem,5vw,4.5rem)] flex items-center gap-2 md:leading-19">
                    <div className="font-pixel text-lg md:hidden text-mute-white/70">
                      {index + 1}.
                    </div>

                    <TextIn alternative>{heading}</TextIn>
                  </h2>
                </div>
                <div className="mb-6 lg:w-3/4 lg:mt-8 mt-4">
                  <div className="text-base md:text-xl text-mute-white/80 width-[80] font-medium tracking-wider leading-5">
                    <TextIn TextStagger={false} delay={400} duration={500}>
                      {para}
                    </TextIn>
                  </div>
                </div>
                <ul>
                  {list.map((l, idx) => {
                    const index = String(idx + 1).padStart(2, "0");
                    return (
                      <li
                        key={`${l}_${idx}`}
                        className="border-b border-white/30 last:border-b-0 py-4"
                      >
                        <div className="flex items-center gap-6 ">
                          <h3 className="text-mute-white/50 text-2xl">
                            <TextIn
                              TextStagger={false}
                              delay={400}
                              duration={500}
                            >
                              {index}
                            </TextIn>
                          </h3>
                          <h3 className="text-mute-white/70 text-3xl font-bold">
                            <TextIn
                              TextStagger={false}
                              delay={400}
                              duration={500}
                            >
                              {l}
                            </TextIn>
                          </h3>
                        </div>
                      </li>
                    );
                  })}
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

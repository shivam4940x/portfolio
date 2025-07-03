import { useEffect, useState } from "react";
import TextIn from "@/components/anim/TextIn";
import { Service as ServiceData } from "@/json/Home.json";
import { Shape1, Shape2, Shape3, Shape4 } from "../ui/Others";

const commonSvgProps = {
  className: "h-[clamp(1.8rem,3vw,4rem)] w-auto opacity-90",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none" as const,
};

const getShape = (i: number, ref?: React.Ref<SVGSVGElement>) => {
  const props = { ...commonSvgProps, ref };
  switch (i % 4) {
    case 0:
      return <Shape1 {...props} />;
    case 1:
      return <Shape2 {...props} />;
    case 2:
      return <Shape3 {...props} />;
    case 3:
      return <Shape4 {...props} />;
  }
};


const Service = () => {
  const [h2Height, setH2Height] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  useEffect(() => {
    const getHeight = () => {
      const service = document.querySelector(
        "#Service .service"
      ) as HTMLElement;
      if (!service) return;
      const h2 = service.querySelector(" h2") as HTMLElement;
      if (!h2) return;

      const { height } = h2.getBoundingClientRect();
      const { height: serviceHight } = service.getBoundingClientRect();
      setH2Height(height);
      setContainerHeight(serviceHight);
    };
    window.onresize = getHeight;
    getHeight();
  }, []);
  

  return (
    <div
      style={{
        minHeight: `calc((${containerHeight}px * 5) - 1rem)`,
      }}
      className="relative md:pt-10 pt-6 border-t border-b bg-dull-black"
    >
      {/* Intro */}
      <div className="w-full mb-4 md:mb-0 px-4 md:px-10">
        <div className="py-2 md:py-6 md:space-y-4">
          <h1 style={{ wordSpacing: "3px" }} className="heading">
            <TextIn>{ServiceData.Heading.main}</TextIn>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-10">
            <div className="col-span-4"></div>
            <div className="col-span-6 xl:col-span-5 flex gap-5 flex-col lg:flex-row">
              <div className="text-lg mr-8">
                <TextIn TextStagger={false}>(services)</TextIn>
              </div>
              <div className="text-base md:text-2xl font-medium ">
                <TextIn TextStagger={false} delay={400}>
                  {ServiceData.Heading.subHeading}
                </TextIn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Sections */}
      {ServiceData.services.map(({ heading, para, list }, index) => {
        return (
          <div
            key={`${heading}_${index}`}
            className="sticky service md:pb-70 pb-40 last:pb-12 last:md:pb-32"
            style={{ top: `${Math.max(h2Height + 14, 60) * index}px` }}
          >
            <div className="border-t border-border-light py-4 bg-dull-black grid grid-cols-1 lg:grid-cols-10 gap-y-10 items-start px-4 md:px-10">
              <h2 className=" heading_2 col-span-4 hidden lg:flex justify-center items-center w-max font-bold">
                {index + 1}.
              </h2>
              <div className="col-span-1 md:col-span-6 ">
                <div className="text-mute-white/95 font-bold tracking-tight flex justify-between items-center">
                  <h2 className="heading_2 flex items-start gap-2 md:leading-20 w-max">
                    <div className="md:hidden text-mute-white/70">
                      {index + 1}.
                    </div>
                    <TextIn alternative>{heading}</TextIn>
                  </h2>
                  {getShape(index)}
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
                    return (
                      <li
                        key={`${l}_${idx}`}
                        className="border-b border-white/30 last:border-b-0 py-4"
                      >
                        <div className="flex items-center gap-6 ">
                          <div className="font-pixel h-full center text-secondary text-2xl">
                            &gt;
                          </div>
                          <h3 className="text-mute-white/70 md:text-3xl text-lg font-bold center">
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

export default Service;

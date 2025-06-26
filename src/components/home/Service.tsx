import { useEffect, useState } from "react";
import TextIn from "@/components/anim/TextIn";
import { Service as ServiceData } from "@/json/Home.json";

const commonSvgProps = {
  className: "h-[clamp(1.8rem,3vw,4rem)] w-auto opacity-90",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none" as const,
};

const Shape1 = () => (
  <svg {...commonSvgProps} viewBox="0 0 100 100">
    <g clipPath="url(#clip0)">
      <path
        d="M50 0L63.5 36.5L100 50L63.5 63.5L50 100L36.5 63.5L0 50L36.5 36.5L50 0Z"
        fill="#a19d99"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="100" height="100" fill="#a19d99" />
      </clipPath>
    </defs>
  </svg>
);

const Shape2 = () => (
  <svg {...commonSvgProps} viewBox="0 0 96 91">
    <path
      d="M48 0L95.55 34.55L77.39 90.45H18.61L0.45 34.55L48 0Z"
      fill="#a19d99"
    />
  </svg>
);

const Shape3 = () => (
  <svg {...commonSvgProps} viewBox="0 0 88 100">
    <path d="M44 0L87.3 25V75L44 100L0.7 75V25L44 0Z" fill="#a19d99" />
  </svg>
);

const Shape4 = () => (
  <svg
    {...{
      ...commonSvgProps,
      className: "h-[clamp(1.8rem,2.3vw,4rem)] w-auto opacity-90",
    }}
    viewBox="0 0 88 75"
  >
    <path d="M44 0L87.3 75H0.7L44 0Z" fill="#a19d99" />
  </svg>
);

const shapes = [
  <Shape1 key={0} />,
  <Shape2 key={1} />,
  <Shape3 key={2} />,
  <Shape4 key={3} />,
];

const getShape = (i: number) => shapes[i % shapes.length];

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
      className="relative md:pt-10 pt-4 border-t border-b bg-dull-black"
    >
      {/* Intro */}
      <div className="w-full mb-4 md:mb-0 px-4 md:px-10">
        <div className="py-2 md:py-6 md:space-y-4">
          <h1 style={{ wordSpacing: "3px" }} className="heading  ">
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
              <div className="font-pixel text-5xl col-span-4 hidden lg:flex justify-center items-center w-max leading-20">
                ({index + 1})
              </div>
              <div className="col-span-1 md:col-span-6 ">
                <div className="text-mute-white/95 font-bold tracking-tight flex justify-between items-center">
                  <h2 className="heading_2 flex items-start gap-2 md:leading-20 w-max">
                    <div className="font-pixel text-lg md:hidden text-mute-white/70">
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

export default Service;

import { exp } from "@/json/About.json";
import { Fragment } from "react/jsx-runtime";
import TextIn from "../anim/TextIn";
function formatter(str: string) {
  const html = str.replace(/\n/g, "<br/>").replace(/_(.*?)_/g, "<i>$1</i>");
  return { __html: html };
}

const Experience = () => {
  return exp.map(({ companyName, startDate, endDate, desc }) => (
    <Fragment key={startDate}>
      <div className="p-4">
        <div className="txt relative ">
          <div className="absolute left-0 top-0 lg:w-40 lg:h-full h-32 w-full">
            <div className="flex flex-col justify-between items-cente div">
              <div>
                <div className="text-lg lg:text-xl lg:text-center w-full">
                  {startDate}
                </div>
              </div>
              <div className="grow flex justify-center lg:items-center items-start my-2 flex-col">
                <div className="lg:h-1/2 h-5 w-px bg-secondary relative">
                  <div className="absolute lg:right-2 left-2 lg:left-[unset] top-0 text-xs lg:text-sm">
                    <span>From</span>
                  </div>
                </div>
                <h6 className="text-complimentary capitalize center">
                  <TextIn TextStagger={false} alternative={true} delay={500}>
                    {companyName}
                  </TextIn>
                </h6>
                <div className="lg:h-1/2 h-5 w-px bg-secondary relative">
                  <div className="absolute left-2 bottom-0 text-xs lg:text-sm">
                    <span>To</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-lg lg:text-xl lg:text-center w-full">
                  {endDate}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pl-40 pt-32 lg:pt-0">
            <div className="lg:py-12 lg:px-8 py-4 text-justify lg:text-lg text-mute-white/90 weight-[80] leading-relaxed tracking-tight">
              <span dangerouslySetInnerHTML={formatter(desc)} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ));
};

export default Experience;

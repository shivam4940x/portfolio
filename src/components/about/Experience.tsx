import { exp } from "@/json/About.json";
import { Fragment } from "react/jsx-runtime";

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
                <div className="h-1/2 w-px bg-secondary relative">
                  <div className="absolute lg:right-2 left-2 lg:left-[unset] top-0 text-xs lg:text-sm">
                    <span>From</span>
                  </div>
                </div>
                <h6 className="text-complimentary capitalize text-center">
                  {companyName}
                </h6>
                <div className="h-1/2 w-px bg-secondary relative">
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
              {desc}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ));
};

export default Experience;

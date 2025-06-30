import { exp } from "@/json/About.json";
import { Fragment } from "react/jsx-runtime";

const Experience = () => {
  return exp.map(({ companyName, startDate, endDate, desc }) => (
    <Fragment key={startDate}>
      <div className="p-4">
        <div className="txt relative ">
          <div className="absolute left-0 top-0 w-40 h-full">
            <div className="flex flex-col justify-between items-cente div">
              <div>
                <div className=" text-lg md:text-xl text-center w-full">
                  {startDate}
                </div>
              </div>
              <div className="grow center my-2 flex-col">
                <div className="h-1/2 w-px bg-secondary relative">
                  <div className="absolute right-2 top-0 text-xs md:text-sm">
                    <span>From</span>
                  </div>
                </div>
                <h6 className="text-complimentary capitalize text-center">{companyName}</h6>
                <div className="h-1/2 w-px bg-secondary relative">
                  <div className="absolute left-2 bottom-0 text-xs md:text-sm">
                    <span>To</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-lg md:text-xl text-center w-full">
                  {endDate}
                </div>
              </div>
            </div>
          </div>
          <div className="pl-40">
            <div className="py-12 px-8 text-justify md:text-lg text-mute-white/90 weight-[80] leading-relaxed tracking-tight">
              {desc}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ));
};

export default Experience;

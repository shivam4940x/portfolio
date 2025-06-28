import WorkBg from "@/components/physics/WorkBg";
import List from "@/components/work/List";

import { work as workData } from "@/json/Work.json";
import { Fragment } from "react/jsx-runtime";

const Work = () => {
  return (
    <>
      <section className="md:mt-8 mt-1">
        <div className="md:px-8 pt-5.5 px-4 h-[50dvh] max-h-80 relative">
          <WorkBg />
        </div>
        <div>
          <div className="w-full border-t border-b border-border-light">
            {workData.personal.map((item) => {
              return <Fragment key={item.heading}>{List(item)}</Fragment>;
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Work;

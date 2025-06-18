import Magnetic from "../anim/Magnetic";
import TextIn from "../anim/TextIn";
import PhysicsShit from "../physics/PhysicsShit";
import GridBg from "../ui/GridBg";

const Hero = () => {
  return (
    <>
      <div className="h-[26rem] relative border-b border-border px-10 pt-7">
        <div className="flex justify-between flex-col div">
          <div className="w-max z-20 fadeIn">
            <Magnetic className="flex">
              <div className="w-3 border-3 border-r-0"></div>
              <div className="font-pixel tracking-wider leading-loose px-3">
                <Magnetic strength={30}>
                  <span>shivam singh</span>
                </Magnetic>
              </div>
              <div className="w-3 border-3 border-l-0"></div>
            </Magnetic>
          </div>
          <div className="space-y-3 z-20 w-max">
            <div className="font-light text-lg">
              <TextIn delay={300}>Hello, I'm a</TextIn>
            </div>
            <div className="font-satoshi uppercase font-extrabold tracking-wide text-8xl leading-[75px] text-complimentary">
              <TextIn>web developer</TextIn>
            </div>
          </div>
        </div>
        <div className="absolute z-10 takeScreen">
          <PhysicsShit />
        </div>
      </div>
      <div className="relative h-96 overflow-hidden px-4 font-[200] width-[85] tracking-widest">
        <div className="w-max ml-auto text-4xl">
          {[
            "Design. Code. Develop.",
            "A Full-Cycle Web Journey",
            "by One Developer",
          ].map((txt) => (
            <div key={txt} className="flex items-end h-20 leading-10">
              <span>
                <TextIn delay={500}>{txt}</TextIn>
              </span>
            </div>
          ))}
        </div>

        <div>
          <GridBg />
        </div>
      </div>
    </>
  );
};

export default Hero;

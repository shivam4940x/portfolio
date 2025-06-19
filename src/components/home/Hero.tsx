import TextIn from "../anim/TextIn";
import PhysicsShit from "../physics/PhysicsShit";
import GridBg from "../ui/GridBg";
import Logo from "../util/Logo";

const Hero = () => {
  return (
    <>
      <div className="md:h-3/5 h-4/6 relative border-b  md:px-10 md:pt-7">
        <div className="flex justify-between flex-col div">
          <div className="h-15 border-b md:border-0 md:h-max flex items-center px-5 md:px-0 bg-primary z-20 md:w-max md:bg-transparent">
            <Logo />
          </div>
          <div className="z-20 w-max">
            <div className="font-light md:text-lg text-sm px-6 md:px-0">
              <TextIn delay={300}>Hello, I'm a</TextIn>
            </div>
            <div className="font-satoshi uppercase font-extrabold tracking-wide text-complimentary">
              <div className="md:text-6xl lg:text-7xl xl:text-8xl xl:leading-[75px] hidden md:block px-5 md:px-0">
                <TextIn>web developer</TextIn>
              </div>
              <div className="relative text-5xl sm:text-5xl md:hidden flex flex-col px-5 md:px-0 leading-[40px]">
                <div className="h-18">
                  <TextIn>full stack</TextIn>
                </div>
                <div className="z-10">
                  <TextIn>developer</TextIn>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[calc(105%_-_3rem)] border-t border-r bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-10 takeScreen">
          <PhysicsShit />
        </div>
      </div>
      <div className="relative h-2/6 md:md:h-2/5 overflow-hidden p-4 md:py-0 font-[200] width-[85] tracking-widest w-full flex items-center md:block">
        <div className="md:max-w-max ml-auto h-max px-4 md:px-0">
          <div className="md:text-4xl text-2xl max-w-72 md:max-w-[26rem]">
            {[
              "Design. Code. Develop.",
              "A Full-Cycle Web Journey",
              "by One Developer",
            ].map((txt) => (
              <div key={txt} className="flex items-end md:min-h-20 leading-10">
                <TextIn delay={500}>{txt}</TextIn>
              </div>
            ))}
          </div>
        </div>

        <div>
          <GridBg />
        </div>
      </div>
    </>
  );
};

export default Hero;

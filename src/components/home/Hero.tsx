import TextIn from "../anim/TextIn";
import PhysicsShit from "../physics/PhysicsShit";
import Logo from "../util/Logo";
import GridBg from "../ui/GridBg";

const Hero = () => {
  return (
    <div className="flex div flex-col">
      <div className="grow relative border-b  md:px-10 md:pt-7 ">
        <div className="flex justify-between flex-col div">
          <div className="h-15 border-b md:border-0 md:h-max flex items-center px-5 md:px-0 bg-primary z-20 md:w-max md:bg-transparent">
            <Logo />
          </div>
          <div className="z-20 w-max tracking-wide">
            <div className="font-light md:text-lg text-sm px-6 md:px-0">
              <TextIn delay={300}>Hello, I'm a</TextIn>
            </div>
            <h1 className="text-complimentary uppercase font-extrabold xl:text-8xl lg:text-7xl  md:text-6xl  sm:text-5xl text-5xl  leading-[40px] md:leading-[50px] lg:leading-[60px] xl:leading-[75px]">
              <div className=" hidden md:block px-5 md:px-0">
                <TextIn>web developer</TextIn>
              </div>
              <div className="relative md:hidden flex flex-col px-5 md:px-0">
                <div className="h-18">
                  <TextIn>full stack</TextIn>
                </div>
                <div className="z-10">
                  <TextIn>developer</TextIn>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[calc(105%_-_3rem)] border-t border-r bg-primary"></div>
              </div>
            </h1>
          </div>
        </div>
        <div className="absolute z-10 takeScreen">
          <PhysicsShit />
        </div>
      </div>
      <div className="relative h-max p-4 md:px-8 md:py-0 font-[200] width-[75] tracking-wide w-full flex items-center md:block">
        <div className="md:max-w-max ml-auto px-4 md:px-0 z-10 relative">
          <div className="md:text-4xl text-2xl max-w-72 md:max-w-[26rem] md:h-64 h-40 py-6 flex justify-between flex-col">
            {[
              "Design. Code. Develop.",
              "A Full-Cycle Web Journey",
              "by One Developer",
            ].map((txt) => (
              <div key={txt} className="flex items-end md:min-h-16">
                <TextIn alternative={true} delay={600}>
                  {txt}
                </TextIn>
              </div>
            ))}
          </div>
        </div>

        {/* <NoiseBg className="div" opacity={10}></NoiseBg> */}
        <GridBg />
      </div>
    </div>
  );
};

export default Hero;

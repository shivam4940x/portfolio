import Experience from "@/components/about/Experience";
import Heading from "@/components/about/Heading";
import SkillDisplay from "@/components/about/SkillDisplay";
import TextIn from "@/components/anim/TextIn";
import Frame from "@/components/ui/Frame";
import Logo from "@/components/ui/Logo";
import { info } from "@/json/About.json";

const About = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute -z-50 takeScreen min-h-screen">
        <div className="relative div">
          <div className="absolute border-deep-steel border-b lg:h-20 h-15 w-full top-0 left-0 z-20">
            <div className="h-full flex justify-center items-center w-max px-4 lg:hidden">
              <Logo />
            </div>
          </div>
          <div className="absolute border-deep-steel border-r h-full w-20 top-0 left-0 bg-primary z-10 hidden lg:block"></div>
        </div>
      </div>
      <section className="lg:p-20 lg:pr-0 p-2">
        <div className="lg:py-4 lg:px-2 pt-20 ">
          <div className="ml-auto w-max lg:mr-auto lg:ml-0  px-2">
            <Frame w={40} h={20} className="w-max px-6 py-3">
              <h1 className="heading">
                <TextIn>About me</TextIn>
              </h1>
            </Frame>
          </div>
          <div className="flex lg:mt-12 gap-10 flex-col lg:flex-row">
            <div id="stats" className="lg:px-4 lg:sticky top-4 h-max">
              <Heading>Stats</Heading>

              <div className="space-y-3 px-2">
                {info.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center capitalize lg:gap-6 gap-2"
                  >
                    <div>
                      <span className="font-pixel text-secondary lg:text-xl lg:text-2xl text-lg">
                        &gt;
                      </span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <h6 className="">{label}:</h6>{" "}
                      <p className="text-mute-white/75 font-medium lg:text-2xl text-lg">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grow pr-4 lg:space-y-8 space-y-6">
              <div id="skils">
                <Heading>Skills</Heading>
                <div>
                  <SkillDisplay />
                </div>
              </div>
              <div id="exp">
                <Heading>Experience</Heading>
                <div>
                  <Experience />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;

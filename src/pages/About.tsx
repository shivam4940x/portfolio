import TextIn from "@/components/anim/TextIn";
import Frame from "@/components/ui/Frame";

const About = () => {
  return (
    <>
      <section className="px-12 py-14 min-h-screen">
        <div>
          <div className="px-2">
            <Frame w={40} h={20} className="w-max px-6 py-3">
              <h1 className="heading">
                <TextIn>About me</TextIn>
              </h1>
            </Frame>
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
};
export default About;

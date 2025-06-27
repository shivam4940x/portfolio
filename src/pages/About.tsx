import TextIn from "@/components/anim/TextIn";
import Frame from "@/components/ui/Frame";

const info = [
  { label: "name", value: "shivam" },
  { label: "age", value: "18" },
  { label: "gender", value: "male" },
  { label: "country", value: "India" },
  { label: "specialist", value: "JavaScript/TypeScript" },
];

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
        <div className="mt-12 px-4 ">
          <div className="space-y-3">
            {info.map(({ label, value }) => (
              <div key={label} className="flex items-center capitalize gap-8">
                <div>
                  <span className="font-pixel text-secondary text-2xl">&gt;</span>
                </div>
                <div className="flex items-center gap-3">
                  <h5 className="">{label}:</h5> <div className="text-mute-white/80 font-semibold text-2xl">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default About;

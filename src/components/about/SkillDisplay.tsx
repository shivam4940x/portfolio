import { developerSkills } from "@/json/About.json";
import TextIn from "../anim/TextIn";

type SkillKey = keyof typeof developerSkills;

const Skill = ({ keys, d = 400 }: { keys: SkillKey[]; d?: number }) => {
  return (
    <>
      {keys.map((key, i) => (
        <div
          key={key}
          className="break-inside-avoid p-4 border border-border-light/50 grow"
        >
          <h6 className="mb-2 uppercase width-[115] tracking-wide lg:font-extrabold font-bold">
            <div className="text-secondary/90">
              <TextIn delay={d * (i + 1)}>{key}</TextIn>
            </div>
          </h6>
          <ul className="list-disc list-inside text-sm lg:text-base lg:columns-2 columns-1">
            {developerSkills[key].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

const leftSkills: SkillKey[] = ["core Languages", "backend"];
const rightSkills: SkillKey[] = ["frontend", "tooling"];

const SkillDisplay = () => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col grow gap-2">
        <Skill keys={leftSkills} />
      </div>
      <div className="flex flex-col grow gap-2">
        <Skill keys={rightSkills} d={600} />
      </div>
    </div>
  );
};
export default SkillDisplay;

import { menu as menuData } from "@/json/Layout.json";
import TransitionLink from "./TransitionLink";
interface Props {
  closeFn: () => void;
}
const Menu = ({ closeFn }: Props) => {
  return (
    <div
      id="Menu"
      className="absolute w-full h-dvh bg-black/50 takeScreen hidden"
    >
      <div
        style={{
          transform: "translateX(100%)",
        }}
        className="absolute md:w-max w-full max-w-2xl h-full bg-dull-black md:right-20 right-0 wrapper pl-20"
      >
        <div className="div px-8 py-4 flex items-center justify-end text-[clamp(2.5rem,3vw,3rem)] font-montserrat font-bold">
          <ul className="group">
            {menuData.links.map((link) => (
              <li
                key={`${link.href}_${link.text}`}
                className="capitalize group-hover:opacity-40 hover:opacity-100 duration-150 flex justify-end"
              >
                <TransitionLink fn={closeFn} to={link.href} className="py-2">
                  {link.text}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;

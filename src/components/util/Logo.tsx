import Magnetic from "../anim/Magnetic";

const Logo = () => {
  return (
    <div className="w-max z-20 fadeIn">
      <Magnetic className="flex">
        <div className="w-3 md:border-3 border-2 border-r-0 md:border-r-0"></div>
        <div className="font-pixel tracking-wider leading-loose px-3 text-xs text-mute-white/80">
          <Magnetic strength={30}>
            <span>shivam singh</span>
          </Magnetic>
        </div>
        <div className="w-3 md:border-3 border-2 border-l-0 md:border-l-0"></div>
      </Magnetic>
    </div>
  );
};
export default Logo;

import TextIn from "../anim/TextIn";
import Btn from "../ui/Btn";
import GridBg from "../ui/GridBg";

const Last = () => {
  return (
    <div className="md:my-30 my-16 px-4 md:px-20">
      <div className="min-h-96 w-full wrapper will-change-transform -translate-y-full border p-8 bg-dull-black relative overflow-hidden">
        <div className="my-12">
          <div className="mx-auto w-max text-mute-white">
            <h1 className="uppercase">
              <div className="center flex-col">
                <div className="tracking-wider heading_2 md:leading-14 mx-auto w-max text-mute-white/90">
                  <TextIn delay={200} threshold={0.7} TextStagger={false}>
                    let's work
                  </TextIn>
                </div>
                <div className="heading w-max">
                  <TextIn space={-1} delay={400} threshold={0.7}>
                    together
                  </TextIn>
                </div>
              </div>
            </h1>
          </div>
          <div className="center md:my-12 my-6 fadeIn">
            <Btn>
              <div className="flex capitalize text-2xl">
                <div>get in touch </div>
                <div className="rotate-45 w-7 aspect-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="div"
                    viewBox="0 0 36 36"
                  >
                    <path
                      fill="currentColor"
                      d="M27.66 15.61L18 6l-9.66 9.61A1 1 0 1 0 9.75 17L17 9.81v19.13a1 1 0 1 0 2 0V9.81L26.25 17a1 1 0 0 0 1.41-1.42Z"
                      className="clr-i-outline clr-i-outline-path-1"
                    ></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                </div>
              </div>
            </Btn>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="md:flex hidden">
            <div className="w-22 aspect-square border px-2 flex items-end">
              <img src="/mainKitty.webp" alt="kitty" />
            </div>
            <div className="border border-l-0 grid grid-row-2 text-mute-white/90">
              <div className="px-4 border-b center">
                <TextIn threshold={0.8}>Working Globally</TextIn>
              </div>
              <div className="px-4 center ">
                <TextIn delay={200} alternative={true} threshold={0.8}>
                  Available for work
                </TextIn>
              </div>
            </div>
          </div>
          <div className="mx-auto w-max md:mx-0">
            <h4 className="text-xl capitalize font-bold">
              For further inquiries
            </h4>
            <a
              href=""
              className="space-x-3 md:hover:font-stretch-expanded duration-100 font-normal"
            >
              <span>⮡ </span>
              <span className="text-complimentary/80">
                shivam4940x@gmail.com
              </span>
            </a>
          </div>
        </div>
        <div className="absolute takeScreen -z-10 opacity-50">
          <GridBg random={true} />
        </div>
      </div>
    </div>
  );
};
export default Last;

import MenuIcon from "@/components/ui/MenuIcon";
import { useAnimeScope } from "@/hooks/useAnimeScope";
import { createDraggable, createSpring } from "animejs";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const { root, scope } = useAnimeScope();

  useEffect(() => {
    scope.current?.add(() => {
      createDraggable(".kitty > div", {
        container: ".kitty",
        releaseEase: createSpring({ stiffness: 300 }),
      });
    });
  }, [scope]);

  return (
    <div className="h-dvh w-screen flex overflow-x-hidden overflow-y-scroll">
      <main className="grow fadeIn duration-500 max-w-full">
        <Outlet />
      </main>
      <div
        ref={root}
        className="top-0 md:sticky pb-2 md:pb-0 fixed right-0 h-full md:w-20 w-15 max-h-dvh flex flex-col justify-between md:border-l "
      >
        <div className="aspect-square w-full bg-deep-steel">
          <MenuIcon fn={() => console.log("ola")} />
        </div>
        <div className="kitty aspect-square md:w-full w-20 -ml-8 md:ml-0">
          <div className="div fadeIn">
            <img
              src="/eppyKitty.webp"
              alt="kitty"
              className="div pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

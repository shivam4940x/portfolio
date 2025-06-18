import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/loaders/Loading";
import LoadingKitty from "./components/loaders/LoadingKitty";
import NumLoader from "./components/loaders/NumLoader";
import { useAnimeScope } from "./hooks/useAnimeScope";
import { animate, stagger } from "animejs";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/default";
import Testing from "@/pages/Testing";

function App() {
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  const { root, scope } = useAnimeScope();
  const location = useLocation();

  const toggleLoading = () => {
    if (isRouteLoading) {
      scope.current?.methods.coverOut();
    }
  };
  useEffect(() => {
    if (!scope.current) return;
    scope.current?.add((self) => {
      self.add("coverOut", () => {
        animate(".cover > div", {
          y: "-100%",
          duration: 800,
          ease: "inOutExpo",
          delay: stagger(300),
          onComplete: () => {
            setIsRouteLoading(false);
          },
        });
      });
    });
  }, [scope]);

  useEffect(() => {
    // setIsRouteLoading(true);
  }, [location.pathname]);

  return (
    <>
      {/* isRouteLoading ? "flex" : "hidden" to enable the lading animation */}
      <div
        ref={root}
        className={`fixed inset-0 z-50 h-dvh w-screen left-0 top-0 justify-center items-center  overflow-hidden ${
          isRouteLoading ? "flex" : "hidden"
        }`}
      >
        <div className="relative h-full w-full z-10 cover">
          <div className="center relative z-40 div bg-[#101113]">
            <LoadingKitty />
            <div className="absolute bottom-0 right-0 w-20 mr-20 mb-5">
              <NumLoader fn={toggleLoading} />
            </div>
          </div>
          <div className="z-30 absolute takeScreen bg-[#a12d01]"></div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="h-screen w-full center text-white bg-dull-black/10">
            <Loading />
          </div>
        }
      >
        {!isRouteLoading && (
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Testing />} />
            </Route>
          </Routes>
        )}
      </Suspense>
    </>
  );
}

export default App;

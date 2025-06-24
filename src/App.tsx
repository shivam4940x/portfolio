import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/loaders/Loading";
import LoadingKitty from "./components/loaders/LoadingKitty";
import NumLoader from "./components/loaders/NumLoader";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/default";
import Testing from "@/pages/Testing";
import { useRouteTransition } from "@/hooks/useRouteTransition";

function App() {
  const { isRouteLoading, onDoneLoading } = useRouteTransition();
  const Pages = [
    { path: "/", element: <Home /> },
    { path: "/test", element: <Testing /> },
    { path: "/work", element: <div>ola</div> },
    { path: "/about", element: <div>ola</div> },
    { path: "/contact", element: <div>ola</div> },
    { path: "/services", element: <div>ola</div> },
  ];
  return (
    <>
      {/* Route transition screen */}
      <div
        id="transition"
        className="fixed inset-0 z-[99999] h-dvh w-screen left-0 top-0 justify-center items-center overflow-hidden"
      >
        <div className="relative h-full w-full z-10 cover">
          <div className="center relative z-40 div bg-[#101113] bgs">
            <LoadingKitty />
            <div className="absolute bottom-0 right-0 w-full md:w-20 md:mr-20 mb-10">
              {isRouteLoading && (
                <NumLoader key={Date.now()} fn={onDoneLoading} />
              )}
            </div>
          </div>
          <div className="z-30 absolute takeScreen bg-[#a12d01] bgs"></div>
        </div>
      </div>

      {/* Route content */}
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
              {Pages.map((page) => (
                <Route path={page.path} element={page.element} />
              ))}
            </Route>
          </Routes>
        )}
      </Suspense>
    </>
  );
}

export default App;

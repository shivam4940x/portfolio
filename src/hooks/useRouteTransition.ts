import { useContext } from "react";
import { RouteTransitionContext } from "../context/RouteTransitionContext";

export const useRouteTransition = () => {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx)
    throw new Error(
      "useRouteTransition must be used inside RouteTransitionProvider"
    );
  return ctx;
};

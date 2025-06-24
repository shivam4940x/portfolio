import { createContext } from "react";

type TransitionContextType = {
  isRouteLoading: boolean;
  beforeLoading: (fn: () => void) => void;
  onDoneLoading: () => void;
};

export const RouteTransitionContext =
  createContext<TransitionContextType | null>(null);

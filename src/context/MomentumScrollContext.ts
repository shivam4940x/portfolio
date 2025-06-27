// MomentumScrollContext.tsx

import {
  createContext,
} from "react";

interface MomentumScrollContextValue {
  containerRef: (node: HTMLElement | null) => void;
  resetScroll: () => void;
  scrollY: number;
  addScrollCallback: (cb: (y: number) => void) => void;
}

export const MomentumScrollContext = createContext<MomentumScrollContextValue | null>(
  null
);

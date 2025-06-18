// useAnimeScope.ts
import { createScope, Scope } from "animejs";
import { useEffect, useRef } from "react";

// Optional: More precise typing for the root if you know the element type (e.g., HTMLDivElement)
export function useAnimeScope<T extends HTMLElement = HTMLDivElement>() {
  const root = useRef<T | null>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    if (root.current) {
      scope.current = createScope({ root });
    }
    return () => {
      scope.current?.revert();
    };
  }, []);

  return { root, scope };
}

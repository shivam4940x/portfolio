import { useEffect, useRef, useCallback } from "react";

interface UseMomentumScrollOptions {
  onScrollUpdate?: (scrollY: number) => void;
  isEnabled?: boolean;
}

export function useMomentumScroll({
  onScrollUpdate,
  isEnabled = true,
}: UseMomentumScrollOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const damping = 0.05;

  const rafIdRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const resetScroll = useCallback(() => {
    const to = 0;
    const container = containerRef.current;
    if (!container) return;

    targetScrollRef.current = to;
    cancelAnimationFrame(rafIdRef.current);

    const updateScroll = () => {
      const delta = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += delta * damping;

      container.scrollTop = currentScrollRef.current;
      onScrollUpdate?.(container.scrollTop);

      if (Math.abs(delta) > 0.5) {
        rafIdRef.current = requestAnimationFrame(updateScroll);
      }
    };

    rafIdRef.current = requestAnimationFrame(updateScroll);
  }, [onScrollUpdate]);

  const attach = useCallback((node: HTMLElement | null) => {
    if (node) {
      node.style.overflow = "hidden";
      node.style.touchAction = "none";
    }
    containerRef.current = node;
  }, []);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl || !isEnabled) return;

    const updateScroll = () => {
      const delta = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += delta * damping;

      containerEl.scrollTop = currentScrollRef.current;
      onScrollUpdate?.(containerEl.scrollTop);

      if (Math.abs(delta) > 0.5) {
        rafIdRef.current = requestAnimationFrame(updateScroll);
      }
    };

    const clampTarget = () => {
      targetScrollRef.current = Math.max(
        0,
        Math.min(
          targetScrollRef.current,
          containerEl.scrollHeight - containerEl.clientHeight
        )
      );
    };

    const forwardWheel = (e: WheelEvent) => {
      e.preventDefault();

      targetScrollRef.current += e.deltaY;
      clampTarget();
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateScroll);
    };

    const onTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
    };

    const SCROLL_ACCELERATION = 2.1; // tweak this value to tune responsiveness

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = (startYRef.current - currentY) * SCROLL_ACCELERATION; // 👈 accelerate
      startYRef.current = currentY;

      targetScrollRef.current += deltaY;
      clampTarget();
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateScroll);
    };

    containerEl.addEventListener("wheel", forwardWheel, { passive: false });
    containerEl.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    containerEl.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      containerEl.removeEventListener("wheel", forwardWheel);
      containerEl.removeEventListener("touchstart", onTouchStart);
      containerEl.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isEnabled, onScrollUpdate]);

  return {
    containerRef: attach,
    resetScroll,
  };
}

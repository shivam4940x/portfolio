import { MomentumScrollContext } from "@/context/MomentumScrollContext";
import { useContext } from "react";

export const useMomentumScrollContext = () => {
  const ctx = useContext(MomentumScrollContext);
  if (!ctx)
    throw new Error("useMomentumScrollContext must be used inside Provider");
  return ctx;
};

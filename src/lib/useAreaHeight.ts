import { CSSProperties, useSyncExternalStore } from "react";

const ADJUSTMENT_PX = 94;

const getSnapshot = () =>
  typeof window !== "undefined"
    ? window.innerHeight - ADJUSTMENT_PX + "px"
    : "0px";

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export function useAreaHeight() {
  const height = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "not_defined_by_server",
  );
  return { "--area-height": height } as CSSProperties;
}

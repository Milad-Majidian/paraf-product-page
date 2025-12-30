import { useSyncExternalStore } from "react";

const subscribe = () => {
  return () => {
  };
};

export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

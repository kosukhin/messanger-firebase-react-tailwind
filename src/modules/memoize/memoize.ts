import { useMemo } from "react";

export function memoize<T extends any>(fn: () => T, deps: any[]) {
  return useMemo<T>(fn, deps);
}

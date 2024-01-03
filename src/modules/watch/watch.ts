import { useEffect } from "react";
import { StateValue } from "../state/state";

export function watch(fn: () => void, deps: StateValue[] = []) {
  useEffect(fn, deps);
};

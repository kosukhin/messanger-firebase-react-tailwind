import { useState } from "react";

export interface StateValue<T = any> {
  target(): T;
  get<R = T>(): R;
  set(newValue: T): void;
}

export function state<T = any>(value: any): StateValue<T> {
  const [theValue, setValue] = useState(value);

  return {
    target(): T {
      return theValue;
    },
    get<R = typeof value>(): R {
      return theValue;
    },
    set(newValue) {
      setValue(newValue);
    },
  };
};

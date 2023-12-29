import { useSelector } from "react-redux";

export type StoreSelector = {
  selector: string;
};

export function useStoreSelector<T>(model: StoreSelector): T {
  return useSelector((state: any) => {
    const parts = model.selector.split(".");
    return parts.reduce((acc, item) => {
        acc = acc[item]
      return acc;
    }, state) as T;
  });
}

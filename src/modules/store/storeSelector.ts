import { useSelector } from "react-redux";

export function storeSelector<T>(
  selector: string
): T {
  return useSelector((state: any) => {
    const parts = selector.split(".");
    return parts.reduce((acc, item) => {
        acc = acc[item]
      return acc;
    }, state) as T;
  });
}

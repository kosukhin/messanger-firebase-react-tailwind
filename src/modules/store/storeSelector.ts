import { useSelector } from "react-redux";

export class StoreSelector {
  constructor(
    public selector: string
  ) {}
}

export function useStoreSelector<T>(
  ...props: ConstructorParameters<typeof StoreSelector>
): T {
  let {selector} = new StoreSelector(...props);
  return useSelector((state: any) => {
    const parts = selector.split(".");
    return parts.reduce((acc, item) => {
        acc = acc[item]
      return acc;
    }, state) as T;
  });
}

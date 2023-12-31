import SystemCookies from "js-cookie";

export class Cookies {
  constructor(
    public key: string,
    public value?: string,
    public operation: 'r' | 'w' | 'd' = 'r',
    public timeout: number = 7,
  ) {}
}

export function cookies(...props: ConstructorParameters<typeof Cookies>) {
  const model = new Cookies(...props);

  if (model.operation === "r") {
    const cookie = SystemCookies.get(model.key);
    model.value = cookie
  }

  if (model.operation === "w") {
    SystemCookies.set(model.key, String(model.value), {
      expires: model.timeout,
    });
  }

  if (model.operation === "d") {
    SystemCookies.remove(model.key);
  }

  return model.value;
}

import SystemCookies from "js-cookie";

export type Cookies = {
  key: string,
  operation: 'r' | 'w' | 'd',
  timeout: number ,
  value?: string,
}

export const cookiesDefaults: Pick<Cookies, 'operation' | 'timeout'> = {
  operation: 'r',
  timeout: 7
}

export function cookies(model: Cookies): Cookies {
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

  return model;
}

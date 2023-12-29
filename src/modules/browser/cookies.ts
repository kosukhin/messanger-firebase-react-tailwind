import SystemCookies from "js-cookie";

export type Cookies<T = void> = (
  key: string,
  value?: string,
  operation?: 'r' | 'w' | 'd',
  timeout?: number ,
) => T

export const cookies: Cookies<Parameters<Cookies>> = (
  key,
  value?,
  operation = 'r',
  timeout = 7,
) => {
  if (operation === "r") {
    const cookie = SystemCookies.get(key);
    value = cookie
  }

  if (operation === "w") {
    SystemCookies.set(key, String(value), {
      expires: timeout,
    });
  }

  if (operation === "d") {
    SystemCookies.remove(key);
  }

  return [key, value, operation, timeout];
}

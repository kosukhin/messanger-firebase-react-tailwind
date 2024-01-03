import SystemCookies from "js-cookie";

export function cookies(
  key: string,
  value?: string,
  operation: "r" | "w" | "d" = "r",
  timeout: number = 7
): string {
  if (operation === "r") {
    const cookie = SystemCookies.get(key);
    value = cookie;
  }

  if (operation === "w") {
    SystemCookies.set(key, String(value), {
      expires: timeout,
    });
  }

  if (operation === "d") {
    SystemCookies.remove(key);
  }

  return value ?? '';
}

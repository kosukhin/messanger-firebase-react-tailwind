import SystemCookies from "js-cookie";


export class Cookies {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    public key: string,
    public operation: 'r' | 'w' | 'd' = 'r',
    public timeout: number = 7,
    public value?: string,
  ) {}

  doIO(this: Cookies) {
    if (this.operation === "r") {
      const cookie = SystemCookies.get(this.key);
      this.value = cookie
    }

    if (this.operation === "w") {
      SystemCookies.set(this.key, String(this.value), {
        expires: this.timeout,
      });
    }

    if (this.operation === "d") {
      SystemCookies.remove(this.key);
    }

    return this;
  }
}

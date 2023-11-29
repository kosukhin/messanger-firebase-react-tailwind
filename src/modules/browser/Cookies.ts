export class Cookies {
  constructor(
    readonly key: string,
    readonly operation: 'r' | 'w' | 'd' = 'r',
    readonly value?: string,
    readonly timeout: number = 7
  ) {
  }
}

import {defineModelFactory} from "../base/I";

export class CookiesModel {
  constructor(
    readonly key: string,
    readonly operation: 'r' | 'w' | 'd',
    readonly timeout: number,
    readonly value?: string,
  ) {
  }
}

export const cookiesModel = defineModelFactory<CookiesModel>({
  operation: 'r',
  timeout: 7
})

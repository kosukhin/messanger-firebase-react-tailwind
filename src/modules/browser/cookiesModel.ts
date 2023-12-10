import {defineModelFactory} from "../base/I";

export type CookiesModel = {
  key: string,
  operation: 'r' | 'w' | 'd',
  timeout: number,
  value?: string,
}

export const cookiesModel = defineModelFactory<CookiesModel>()({
  operation: 'r' as CookiesModel['operation'],
  timeout: 7
})

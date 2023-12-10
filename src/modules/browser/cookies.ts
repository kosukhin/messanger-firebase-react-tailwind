import SystemCookies from "js-cookie";
import { CookiesModel, cookiesModel } from "./cookiesModel";
import { defineModelEffect } from "../base/I";

export const cookies = defineModelEffect<typeof cookiesModel, CookiesModel>(cookiesModel, async (model) => {
  if (model.operation === 'r') {
    const cookie = SystemCookies.get(model.key)
    return cookiesModel(model, {
      value: cookie
    })
  }

  if (model.operation === 'w') {
    SystemCookies.set(model.key, String(model.value), {expires: model.timeout})
    return model;
  }

  if (model.operation === 'd') {
    SystemCookies.remove(model.key)
    return model;
  }

  return model;
})

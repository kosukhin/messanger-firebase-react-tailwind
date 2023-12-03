import {cookiesModel, CookiesModel} from "./CookiesModel";
import SystemCookies from "js-cookie";

export async function cookies(model: CookiesModel) {
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
}

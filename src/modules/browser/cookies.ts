import SystemCookies from "js-cookie";
import { cookiesModel } from "./CookiesModel";

export async function cookies(...args: Parameters<typeof cookiesModel>) {
  const model = cookiesModel(...args);

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

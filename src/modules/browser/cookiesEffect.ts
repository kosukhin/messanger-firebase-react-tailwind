import {Cookies} from "./Cookies";
import SystemCookies from "js-cookie";
import {change} from "../base/I";

export async function cookiesEffect(model: Cookies) {
  if (model.operation === 'r') {
    const cookie = SystemCookies.get(model.key)
    return change(model, {
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

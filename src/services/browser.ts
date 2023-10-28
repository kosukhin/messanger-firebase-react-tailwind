import {operation} from "../lib/operation";
import {browser} from "../models/browser";
import Cookies from 'js-cookie';
import registerApplier = operation.registerApplier;
import CookiesModel = browser.Cookies;

registerApplier('Cookies', (model: CookiesModel) => {
  if (model.operation === 'r') {
    const cookie = Cookies.get(model.key)
    return model.takeChanged({
      value: cookie
    })
  }

  if (model.operation === 'w') {
    Cookies.set(model.key, String(model.value), {expires: model.timeout})
    return model;
  }

  if (model.operation === 'd') {
    Cookies.remove(model.key)
    return model;
  }

  return model;
})

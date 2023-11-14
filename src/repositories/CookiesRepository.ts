import SystemCookies from 'js-cookie';
import {registerApplier} from "../modules/base/I";
import {cookieService} from "../modules/browser/CookiesService";
import {Cookies} from "../modules/browser/Cookies";

registerApplier(cookieService.applierId, (model: Cookies) => {
  if (model.operation === 'r') {
    const cookie = SystemCookies.get(model.key)
    return model.takeChanged({
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

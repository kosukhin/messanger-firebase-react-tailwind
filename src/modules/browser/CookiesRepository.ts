import {Applier, BaseRepository} from "../base/BaseRepository";
import {Cookies} from "./Cookies";
import SystemCookies from 'js-cookie';

export class CookiesRepository extends BaseRepository {
  registerApplier(): Applier {
    return ['Cookies', (model: Cookies) => {
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
    }]
  }
}

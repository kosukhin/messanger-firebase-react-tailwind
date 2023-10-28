import {operation} from "../lib/operation";
import {security} from "./security";
import {browser} from "./browser";

export namespace profile {
  import apply = operation.apply;
  import hash = security.hash;
  import Uuid = security.Uuid;
  import cookies = browser.cookies;
  import Cookies = browser.Cookies;

  export namespace constants {
    export const cookieIdKey = 'uid';
    export const cookieLifeTime = 68000;
  }

  export async function init() {
    const cookieUid = await apply<Cookies>(cookies(constants.cookieIdKey));

    if (!cookieUid.value) {
      const uid = await apply<Uuid>(hash(security.constants.hashUuid));
      await apply(cookieUid.takeChanged({
        value: uid.value,
        operation: 'w',
        timeout: constants.cookieLifeTime
      }))
    }
  }
}

import {operation} from "../lib/operation";
import {security} from "./security";
import {browser} from "./browser";
import {firebase} from "./firebase";
import {store} from "./store";

export namespace profile {
  import apply = operation.apply;
  import hash = security.hash;
  import Uuid = security.Uuid;
  import cookies = browser.cookies;
  import Cookies = browser.Cookies;
  import fb = firebase.models.firebase;
  import Firebase = firebase.models.Firebase;
  import commit = store.commit;

  export namespace constants {
    export const cookieIdKey = 'uid';
    export const cookieLifeTime = 68000;
  }

  export async function userId() {
    return await apply<Cookies>(cookies(constants.cookieIdKey));
  }

  export async function initProfile() {
    const cookieUid = await userId();

    if (!cookieUid.value) {
      const uid = await apply<Uuid>(hash(security.constants.hashUuid));
      await apply(cookieUid.takeChanged({
        value: uid.value,
        operation: 'w',
        timeout: constants.cookieLifeTime
      }))
    }

    await apply(commit('increment'))
    await apply(commit('increment'))
    await apply(commit('increment'))
    await apply(commit('increment'))
  }

  export async function createGroup(name: string) {
    const id = await apply<Uuid>(hash(security.constants.hashUuid));
    const result = await apply<Firebase>(fb('add', 'groups', {
      id: id.value,
      name
    }));

    return result.isDone
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const fromId = await userId()
    const result = await apply<Firebase>(fb('add', 'messages', {
      groupId,
      fromId: fromId.value,
      text
    }));

    return result.isDone
  }
}

import { Cookies } from "../browser/cookies";
import { firebase } from "../firebase/firebase";
import { hash } from "../security/hash";
import { PROFILE_COOKIE_ID_KEY, PROFILE_COOKIE_LIFE_TIME } from "./profileModel";

export namespace profileService {
  export function userId() {
    return new Cookies(PROFILE_COOKIE_ID_KEY).doIO()
  }

  export async function initProfile() {
    const cookieUid = userId();

    if (!cookieUid.value) {
      const uid = hash()
      cookieUid.value = uid.value
      cookieUid.operation = 'w'
      cookieUid.timeout = PROFILE_COOKIE_LIFE_TIME
      cookieUid.doIO();
    }
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const fromId = userId()
    const result = await firebase({
      action: 'add',
      collection: 'messages',
      data: {
        groupId,
        fromId: String(fromId.value),
        text,
        time: (new Date()).getTime()
      }
    });

    return result.isDone
  }
}

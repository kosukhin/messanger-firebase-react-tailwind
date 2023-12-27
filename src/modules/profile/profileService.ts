import { firebaseDefaults } from './../firebase/firebase';
import { cookies } from "../browser/cookies";
import { firebase } from "../firebase/firebase";
import { hash } from "../security/hash";
import { cookiesDefaults } from './../browser/cookies';
import { PROFILE_COOKIE_ID_KEY, PROFILE_COOKIE_LIFE_TIME } from "./profile";

export namespace profileService {
  export function userId() {
    return cookies({
      ...cookiesDefaults,
      key: PROFILE_COOKIE_ID_KEY
    })
  }

  export async function initProfile() {
    const cookieUid = userId();

    if (!cookieUid.value) {
      const uid = hash()
      cookies({
        ...cookieUid,
        operation: 'w',
        value: uid.value,
        timeout: PROFILE_COOKIE_LIFE_TIME
      })
    }
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const fromId = userId()
    const result = await firebase({
      ...firebaseDefaults,
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

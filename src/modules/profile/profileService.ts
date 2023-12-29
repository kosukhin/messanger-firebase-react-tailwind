import { cookies } from "../browser/cookies";
import { firebase } from "../firebase/firebase";
import { hash } from "../security/hash";
import { firebaseDefaults } from './../firebase/firebase';
import { PROFILE_COOKIE_ID_KEY, PROFILE_COOKIE_LIFE_TIME } from "./profile";

export namespace profileService {
  export function userId() {
    return cookies(PROFILE_COOKIE_ID_KEY)
  }

  export async function initProfile() {
    const [key, value] = userId();

    if (!value) {
      const uid = hash()
      cookies(
        key,
        uid.value,
        'w',
        PROFILE_COOKIE_LIFE_TIME
      )
    }
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const [, value] = userId()
    const result = await firebase({
      ...firebaseDefaults,
      action: 'add',
      collection: 'messages',
      data: {
        groupId,
        fromId: String(value),
        text,
        time: (new Date()).getTime()
      }
    });

    return result.isDone
  }
}

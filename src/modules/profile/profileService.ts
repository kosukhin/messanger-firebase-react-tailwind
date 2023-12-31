import { cookies } from "../browser/cookies";
import { firebase } from "../firebase/firebase";
import { hash } from "../security/hash";
import { PROFILE_COOKIE_ID_KEY, PROFILE_COOKIE_LIFE_TIME } from "./profile";

export namespace profileService {
  export function userId() {
    return cookies(PROFILE_COOKIE_ID_KEY)
  }

  export async function initProfile() {
    const theUserId = userId();

    if (!theUserId) {
      const uid = hash()
      cookies(
        PROFILE_COOKIE_ID_KEY,
        uid,
        'w',
        PROFILE_COOKIE_LIFE_TIME
      )
    }
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const theUserId = userId()
    const result = await firebase('add', 'messages', {
      groupId,
      fromId: String(theUserId),
      text,
      time: (new Date()).getTime()
    });

    return !!result
  }
}

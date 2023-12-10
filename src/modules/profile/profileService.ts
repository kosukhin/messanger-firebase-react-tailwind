import { cookies } from "../browser/cookies";
import { firebase } from "../firebase/firebase";
import { hash } from "../security/hash";
import { PROFILE_COOKIE_ID_KEY, PROFILE_COOKIE_LIFE_TIME } from "./profileModel";

export namespace profileService {
  export function userId() {
    return cookies({key: PROFILE_COOKIE_ID_KEY})
  }

  export async function initProfile() {
    const cookieUid = await userId();

    if (!cookieUid.value) {
      const uid = await hash()
      await cookies(cookieUid, {
        value: uid.value,
        operation: 'w',
        timeout: PROFILE_COOKIE_LIFE_TIME
      })
    }
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const fromId = await userId()
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

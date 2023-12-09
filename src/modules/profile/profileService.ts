import { cookies } from "../browser/cookies";
import { firebase } from "../firebase/firebase";
import { hash } from "../security/hash";
import { Profile } from "./Profile";

export namespace profileService {
  export function userId() {
    return cookies({key: Profile.cookieIdKey})
  }

  export async function initProfile() {
    const cookieUid = await userId();

    if (!cookieUid.value) {
      const uid = await hash()
      await cookies(cookieUid, {
        value: uid.value,
        operation: 'w',
        timeout: Profile.cookieLifeTime
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

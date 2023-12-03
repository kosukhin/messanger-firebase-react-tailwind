import {cookiesModel} from "../browser/CookiesModel";
import {Profile} from "./Profile";
import {hashModel} from "../security/HashModel";
import {firebaseModel} from "../firebase/FirebaseModel";
import {cookies} from "../browser/cookies";
import {firebase} from "../firebase/firebase";
import {hash} from "../security/hash";

export namespace profileService {
  export function userId() {
    return cookies(cookiesModel({key: Profile.cookieIdKey}))
  }

  export async function initProfile() {
    const cookieUid = await userId();

    if (!cookieUid.value) {
      const uid = await hash(hashModel())
      await cookies(cookiesModel(cookieUid, {
        value: uid.value,
        operation: 'w',
        timeout: Profile.cookieLifeTime
      }))
    }
  }

  export async function createMessage(
    text: string,
    groupId: string
  ) {
    const fromId = await userId()
    const result = await firebase(firebaseModel({
      action: 'add',
      collection: 'messages',
      data: {
        groupId,
        fromId: String(fromId.value),
        text,
        time: (new Date()).getTime()
      }
    }));

    return result.isDone
  }
}

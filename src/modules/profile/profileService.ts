import {change, create} from "../base/I";
import {Cookies} from "../browser/Cookies";
import {Profile} from "./Profile";
import {Hash} from "../security/Hash";
import {Firebase} from "../firebase/Firebase";
import {cookiesEffect} from "../browser/cookiesEffect";
import {firebaseEffect} from "../firebase/firebaseEffect";
import {hashEffect} from "../security/hashEffect";

export namespace profileService {
  export function userId() {
    return cookiesEffect(create(Cookies, Profile.cookieIdKey))
  }

  export async function initProfile() {
    const cookieUid = await userId();

    if (!cookieUid.value) {
      const uid = await hashEffect(create(Hash, Hash.hashUuid))
      await cookiesEffect(change(cookieUid, {
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
    const result = await firebaseEffect(create(Firebase, 'add', 'messages', {
      groupId,
      fromId: String(fromId.value),
      text,
      time: (new Date()).getTime()
    }));

    return result.isDone
  }
}

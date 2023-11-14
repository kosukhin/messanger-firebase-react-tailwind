import {takeInstance} from "../base/I";
import {Cookies} from "../browser/Cookies";
import {Profile} from "./Profile";
import {Hash} from "../security/Hash";
import {Firebase} from "../firebase/Firebase";
import {firebaseService} from "../firebase/FirebaseService";
import {cookieService} from "../browser/CookiesService";
import {hashService} from "../security/HashService";

export namespace profileService {
  export function userId() {
    return cookieService.apply<Cookies>(takeInstance(Cookies, Profile.cookieIdKey))
  }

  export async function initProfile() {
    const cookieUid = await userId();

    if (!cookieUid.value) {
      const uid = await hashService.apply<Hash>(takeInstance(Hash, Hash.hashUuid))
      await cookieService.apply(cookieUid.takeChanged({
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
    const result = await firebaseService.apply<Firebase>(takeInstance(Firebase, 'add', 'messages', {
      groupId,
      fromId: String(fromId.value),
      text,
      time: (new Date()).getTime()
    }));

    return result.isDone
  }
}

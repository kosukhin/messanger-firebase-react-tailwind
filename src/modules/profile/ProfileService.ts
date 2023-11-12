import {BaseService} from "../base/BaseService";
import {takeInstance, takeService} from "../base/I";
import {Cookies} from "../browser/Cookies";
import {Profile} from "./Profile";
import {Hash} from "../security/Hash";
import {Firebase} from "../firebase/Firebase";
import {FirebaseService} from "../firebase/FirebaseService";
import {CookiesService} from "../browser/CookiesService";
import {HashService} from "../security/HashService";

export class ProfileService extends BaseService {
  userId() {
    const cookies = takeService(CookiesService)
    return cookies.apply<Cookies>(takeInstance(Cookies, Profile.cookieIdKey))
  }

  async initProfile() {
    const cookieUid = await this.userId();

    if (!cookieUid.value) {
      const cookies = takeService(CookiesService)
      const hash = takeService(HashService)
      const uid = await hash.apply<Hash>(takeInstance(Hash, Hash.hashUuid))
      await cookies.apply(cookieUid.takeChanged({
        value: uid.value,
        operation: 'w',
        timeout: Profile.cookieLifeTime
      }))
    }
  }

  async createMessage(
    text: string,
    groupId: string
  ) {
    const firebase = takeService(FirebaseService)
    const fromId = await this.userId()
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'add', 'messages', {
      groupId,
      fromId: String(fromId.value),
      text,
      time: (new Date()).getTime()
    }));

    return result.isDone
  }
}

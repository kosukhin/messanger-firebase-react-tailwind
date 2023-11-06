import {BaseService} from "../base/BaseService";
import {takeInstance} from "../base/I";
import {Cookies} from "../browser/Cookies";
import {Profile} from "./Profile";
import {Hash} from "../security/Hash";
import {Firebase} from "../firebase/Firebase";
import {takeServices} from "../base/takeServices";

export class ProfileService extends BaseService {
  userId() {
    const {cookies} = takeServices()
    return cookies.apply<Cookies>(takeInstance(Cookies, Profile.cookieIdKey))
  }

  async initProfile() {
    const cookieUid = await this.userId();

    if (!cookieUid.value) {
      const {cookies, hash} = takeServices();
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
    const {firebase} = takeServices();
    const fromId = await this.userId()
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'add', 'messages', {
      groupId,
      fromId: String(fromId.value),
      text
    }));

    return result.isDone
  }
}

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

  async getGroup(id: string) {
    const {firebase} = takeServices();
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'get', 'groups', {
      id
    }));
    console.log('get result', result.result);
  }

  async getAllGroups() {
    const {firebase} = takeServices();
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'list', 'groups', {}));
    console.log('get result', result.result);
  }

  async findById(id: string) {
    const {firebase} = takeServices();
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'list', 'groups', {
      where: [
        ['id', '==', id]
      ]
    }));
    console.log('get result', result.result);
  }

  async deleteById(id: string) {
    const {firebase} = takeServices();
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'remove', 'groups', {
      id
    }));
    console.log('remove result', result.result);
  }

  async updateGroup(data: any) {
    const {firebase} = takeServices();
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'update', 'groups', data));
    console.log('get result', result.result);
  }

  async createGroup(name: string) {
    const {hash, firebase} = takeServices();
    const id = await hash.apply<Hash>(takeInstance(Hash, Hash.hashUuid));
    const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'add', 'groups', {
      id: id.value,
      name
    }));

    return result.isDone
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

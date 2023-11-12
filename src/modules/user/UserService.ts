import {BaseService} from "../base/BaseService";
import {User} from "./User";
import {FirebaseCrud, FirebaseService} from "../firebase/FirebaseService";
import {takeInstance, takeService} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Message} from "../message/Message";
import {StoreCommit} from "../store/StoreCommit";
import {ProfileService} from "../profile/ProfileService";
import {StoreCommitService} from "../store/StoreCommitService";

export class UserService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const firebase = takeService(FirebaseService)
    this.crud = firebase.buildCrud(User.collectionName)
  }

  async currentUser() {
    const profile = takeService(ProfileService)
    const userIdCookie = await profile.userId()
    const userId = String(userIdCookie.value)
    const existedUser = await this.crud.getById(userId)

    if (existedUser) {
      return takeInstance(
        User,
        existedUser.id,
        existedUser.id,
        existedUser.name,
        existedUser.avatar,
      )
    }

    return takeInstance(
      User,
      userId,
      userId,
      User.defaultName,
      User.defaultAvatar
    )
  }

  async watchUsers() {
    const firebase = takeService(FirebaseService)
    const storeCommit = takeService(StoreCommitService)
    await firebase.apply(takeInstance(Firebase, 'onCollection', User.collectionName, {
      async onData(data: Message[]) {
        await storeCommit.apply(takeInstance(
          StoreCommit,
          'setUsers',
          data
        ))
      },
    }))
  }
}

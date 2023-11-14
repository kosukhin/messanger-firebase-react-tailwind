import {User} from "./User";
import {firebaseService} from "../firebase/FirebaseService";
import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Message} from "../message/Message";
import {StoreCommit} from "../store/StoreCommit";
import {profileService} from "../profile/ProfileService";
import {storeCommitService} from "../store/StoreCommitService";

export namespace userService {
  export const crud = firebaseService.buildCrud(User.collectionName)

  export async function currentUser() {
    const userIdCookie = await profileService.userId()
    const userId = String(userIdCookie.value)
    const existedUser = await crud.getById(userId)

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

  export async function watchUsers() {
    await firebaseService.apply(takeInstance(Firebase, 'onCollection', User.collectionName, {
      async onData(data: Message[]) {
        await storeCommitService.apply(takeInstance(
          StoreCommit,
          'setUsers',
          data
        ))
      },
    }))
  }
}

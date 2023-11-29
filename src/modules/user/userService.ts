import {User} from "./User";
import {firebaseService} from "../firebase/firebaseService";
import {create} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Message} from "../message/Message";
import {StoreCommit} from "../store/StoreCommit";
import {profileService} from "../profile/profileService";
import {firebaseEffect} from "../firebase/firebaseEffect";
import {storeCommitEffect} from "../store/storeCommitEffect";

export namespace userService {
  export const crud = firebaseService.buildCrud(User.collectionName)

  export async function currentUser() {
    const userIdCookie = await profileService.userId()
    const userId = String(userIdCookie.value)
    const existedUser = await crud.getById(userId)

    if (existedUser) {
      return create(
        User,
        existedUser.id,
        existedUser.id,
        existedUser.name,
        existedUser.avatar,
      )
    }

    return create(
      User,
      userId,
      userId,
      User.defaultName,
      User.defaultAvatar
    )
  }

  export async function watchUsers() {
    await firebaseEffect(create(Firebase, 'onCollection', User.collectionName, {
      async onData(data: Message[]) {
        await storeCommitEffect(create(
          StoreCommit,
          'setUsers',
          data
        ))
      },
    }))
  }
}

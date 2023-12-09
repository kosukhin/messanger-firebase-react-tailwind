import { firebase } from "../firebase/firebase";
import { firebaseModel } from "../firebase/FirebaseModel";
import { firebaseService } from "../firebase/firebaseService";
import { MessageModel } from "../message/MessageModel";
import { profileService } from "../profile/profileService";
import { storeCommit } from "../store/storeCommit";
import { storeCommitModel } from "../store/StoreCommitModel";
import { DEFAULT_AVATAR, DEFAULT_NAME, userModel, USERS_COLLECTION } from "./UserModel";

export namespace userService {
  export const crud = firebaseService.buildCrud(USERS_COLLECTION)

  export async function currentUser() {
    const userIdCookie = await profileService.userId()
    const userId = String(userIdCookie.value)
    const existedUser = await crud.getById(userId)

    if (existedUser) {
      return userModel({
        _id: existedUser.id,
        id: existedUser.id,
        name: existedUser.name,
        avatar: existedUser.avatar,
      })
    }

    return userModel({
      _id: userId,
      id: userId,
      name: DEFAULT_NAME,
      avatar: DEFAULT_AVATAR
    })
  }

  export async function watchUsers() {
    await firebase(firebaseModel({
      action: 'onCollection',
      collection: USERS_COLLECTION,
      data: {
        async onData(data: MessageModel[]) {
          await storeCommit(storeCommitModel({
            action: 'setUsers',
            payload: data
          }))
        },
      }
    }))
  }
}
import {userModel, UserModel} from "./UserModel";
import {firebaseService} from "../firebase/firebaseService";
import {firebaseModel} from "../firebase/FirebaseModel";
import {MessageModel} from "../message/MessageModel";
import {storeCommitModel} from "../store/StoreCommitModel";
import {profileService} from "../profile/profileService";
import {firebase} from "../firebase/firebase";
import {storeCommit} from "../store/storeCommit";

export namespace userService {
  export const crud = firebaseService.buildCrud(UserModel.collectionName)

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
      name: UserModel.defaultName,
      avatar: UserModel.defaultAvatar
    })
  }

  export async function watchUsers() {
    await firebase(firebaseModel({
      action: 'onCollection',
      collection: UserModel.collectionName,
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

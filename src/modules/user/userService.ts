import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { Message } from "../message/message";
import { profileService } from "../profile/profileService";
import { storeCommit } from "../store/storeCommit";
import { firebaseDefaults } from './../firebase/firebase';
import { DEFAULT_AVATAR, DEFAULT_NAME, USERS_COLLECTION } from "./user";

export namespace userService {
  export const crud = firebaseService.buildCrud(USERS_COLLECTION)

  export async function currentUser() {
    const userIdCookie = await profileService.userId()
    const userId = String(userIdCookie.value)
    const existedUser = await crud.getById(userId)

    if (existedUser) {
      return {
        _id: existedUser.id,
        id: existedUser.id,
        name: existedUser.name,
        avatar: existedUser.avatar,
      }
    }

    return {
      _id: userId,
      id: userId,
      name: DEFAULT_NAME,
      avatar: DEFAULT_AVATAR
    }
  }

  export async function watchUsers() {
    await firebase({
      ...firebaseDefaults,
      action: 'onCollection',
      collection: USERS_COLLECTION,
      data: {
        async onData(data: Message[]) {
          storeCommit({
            action: 'setUsers',
            payload: data
          })
        },
      }
    })
  }
}

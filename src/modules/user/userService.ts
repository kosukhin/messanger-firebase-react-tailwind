import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { Message } from "../message/message";
import { profileService } from "../profile/profileService";
import { storeCommit } from "../store/storeCommit";
import { USERS_COLLECTION, User, user } from "./user";

export namespace userService {
  export const crud = firebaseService.buildCrud(USERS_COLLECTION)

  export async function currentUser() {
    const theUserId = profileService.userId()
    const existedUser = await crud.getById<User>(
      String(theUserId)
    )

    if (existedUser) {
      return {
        ...user(theUserId, theUserId),
        ...existedUser
      };
    }

    return user(theUserId, theUserId)
  }

  export async function watchUsers() {
    await firebase('onCollection', USERS_COLLECTION, {
      async onData(data: Message[]) {
        storeCommit('setUsers', data)
      },
    })
  }
}

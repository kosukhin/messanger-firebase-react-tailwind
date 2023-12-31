import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { GROUP_COLLECTION, Group } from "./group";

export namespace groupService {
  export const crud = firebaseService.buildCrud(GROUP_COLLECTION)

  export async function watchGroups() {
    await firebase('onCollection', GROUP_COLLECTION, {
      async onData(data: Group[]) {
        storeCommit('setGroups', data)
      },
    })
  }
}

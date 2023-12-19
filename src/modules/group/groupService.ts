import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { GROUP_COLLECTION, GroupModel } from "./groupModel";

export namespace groupService {
  export const crud = firebaseService.buildCrud(GROUP_COLLECTION)

  export async function watchGroups() {
    await firebase({
      action: 'onCollection',
      collection: GROUP_COLLECTION,
      data: {
        async onData(data: GroupModel[]) {
          storeCommit({
            action: 'setGroups',
            payload: data
          })
        },
      }
    })
  }
}

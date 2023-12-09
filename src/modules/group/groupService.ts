import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { GroupModel } from "./GroupModel";

export namespace groupService {
  export const crud = firebaseService.buildCrud(GroupModel.collectionName)

  export async function watchGroups() {
    await firebase({
      action: 'onCollection',
      collection: GroupModel.collectionName,
      data: {
        async onData(data: GroupModel[]) {
          await storeCommit({
            action: 'setGroups',
            payload: data
          })
        },
      }
    })
  }
}

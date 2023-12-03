import {firebaseModel} from "../firebase/FirebaseModel";
import {GroupModel} from "./GroupModel";
import {storeCommitModel} from "../store/StoreCommitModel";
import {firebaseService} from "../firebase/firebaseService";
import {firebase} from "../firebase/firebase";
import {storeCommit} from "../store/storeCommit";

export namespace groupService {
  export const crud = firebaseService.buildCrud(GroupModel.collectionName)

  export async function watchGroups() {
    await firebase(firebaseModel({
      action: 'onCollection',
      collection: GroupModel.collectionName,
      data: {
        async onData(data: GroupModel[]) {
          await storeCommit(storeCommitModel({
            action: 'setGroups',
            payload: data
          }))
        },
      }
    }))
  }
}

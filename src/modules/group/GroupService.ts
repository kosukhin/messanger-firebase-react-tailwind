import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Group} from "./Group";
import {StoreCommit} from "../store/StoreCommit";
import {firebaseService} from "../firebase/FirebaseService";
import {storeCommitService} from "../store/StoreCommitService";

export namespace groupService {
  export const crud = firebaseService.buildCrud(Group.collectionName)

  export async function watchGroups() {
    await firebaseService.apply(takeInstance(Firebase, 'onCollection', Group.collectionName, {
      async onData(data: Group[]) {
        await storeCommitService.apply(takeInstance(StoreCommit, 'setGroups', data))
      },
    }))
  }
}

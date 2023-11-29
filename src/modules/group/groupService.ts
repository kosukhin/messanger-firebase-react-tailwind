import {create} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Group} from "./Group";
import {StoreCommit} from "../store/StoreCommit";
import {firebaseService} from "../firebase/firebaseService";
import {firebaseEffect} from "../firebase/firebaseEffect";
import {storeCommitEffect} from "../store/storeCommitEffect";

export namespace groupService {
  export const crud = firebaseService.buildCrud(Group.collectionName)

  export async function watchGroups() {
    await firebaseEffect(create(Firebase, 'onCollection', Group.collectionName, {
      async onData(data: Group[]) {
        await storeCommitEffect(create(StoreCommit, 'setGroups', data))
      },
    }))
  }
}

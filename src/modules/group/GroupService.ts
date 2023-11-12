import {BaseService} from "../base/BaseService";
import {takeInstance, takeService} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Group} from "./Group";
import {StoreCommit} from "../store/StoreCommit";
import {FirebaseCrud, FirebaseService} from "../firebase/FirebaseService";
import {StoreCommitService} from "../store/StoreCommitService";

export class GroupService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const firebase = takeService(FirebaseService)
    this.crud = firebase.buildCrud(Group.collectionName)
  }

  async watchGroups() {
    const firebase = takeService(FirebaseService)
    const storeCommit = takeService(StoreCommitService)
    await firebase.apply(takeInstance(Firebase, 'onCollection', Group.collectionName, {
      async onData(data: Group[]) {
        await storeCommit.apply(takeInstance(StoreCommit, 'setGroups', data))
      },
    }))
  }
}

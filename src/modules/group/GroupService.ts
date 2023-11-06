import {BaseService} from "../base/BaseService";
import {takeServices} from "../base/takeServices";
import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Group} from "./Group";
import {StoreCommit} from "../store/StoreCommit";
import {FirebaseCrud} from "../firebase/FirebaseService";

export class GroupService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const {firebase} = takeServices()
    this.crud = firebase.buildCrud(Group.collectionName)
  }

  async watchGroups() {
    const {firebase, storeCommit} = takeServices()
    await firebase.apply(takeInstance(Firebase, 'onCollection', Group.collectionName, {
      async onData(data: Group[]) {
        await storeCommit.apply(takeInstance(StoreCommit, 'setGroups', data))
      },
    }))
  }
}

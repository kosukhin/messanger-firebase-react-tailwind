import {BaseService} from "../base/BaseService";
import {takeServices} from "../base/takeServices";
import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {Group} from "./Group";
import {StoreCommit} from "../store/StoreCommit";

export class GroupService extends BaseService {
  async watchGroups() {
    const {firebase, storeCommit} = takeServices()
    await firebase.apply(takeInstance(Firebase, 'onCollection', 'groups', {
      async onData(data: Group[]) {
        await storeCommit.apply(takeInstance(StoreCommit, 'setGroups', data))
      },
    }))
  }
}

import {registerApplier} from "../modules/base/I";
import {storeCommitService} from "../modules/store/StoreCommitService";
import {counterSlice} from "../store/counterSlice";
import {groupSlice} from "../store/groupSlice";
import {messageSlice} from "../store/messageSlice";
import {userSlice} from "../store/userSlice";
import {StoreCommit} from "../modules/store/StoreCommit";
import {store} from "../store/store";

const {incremented, decremented} = counterSlice.actions
const {setGroups} = groupSlice.actions
const {setMessages} = messageSlice.actions
const {setUsers} = userSlice.actions

const actions: any = {
  incremented,
  decremented,
  setGroups,
  setMessages,
  setUsers
}

registerApplier(storeCommitService.applierId, (model: StoreCommit) => {
  if (actions[model.action]) {
    store.dispatch(actions[model.action](model.payload))
  }
})

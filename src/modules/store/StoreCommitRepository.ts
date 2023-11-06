import {Applier, BaseRepository} from "../base/BaseRepository";
import {StoreCommit} from "./StoreCommit";
import {counterSlice} from "../../store/counterSlice";
import {groupSlice} from "../../store/groupSlice";
import {messageSlice} from "../../store/messageSlice";
import {store} from "../../store/store";
import {userSlice} from "../../store/userSlice";

export class StoreCommitRepository extends BaseRepository {
  registerApplier(): Applier {
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

    return ['StoreCommit', (model: StoreCommit) => {
      if (actions[model.action]) {
        store.dispatch(actions[model.action](model.payload))
      }
    }]
  }
}

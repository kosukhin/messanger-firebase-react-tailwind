import { counterSlice } from "../../store/counterSlice";
import { groupSlice } from "../../store/groupSlice";
import { messageSlice } from "../../store/messageSlice";
import { store } from "../../store/store";
import { userSlice } from "../../store/userSlice";
import { storeCommitModel } from "./StoreCommitModel";

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

export async function storeCommit(...args: Parameters<typeof storeCommitModel>) {
  const model = storeCommitModel(...args)
  if (actions[model.action]) {
    store.dispatch(actions[model.action](model.payload))
  }
}

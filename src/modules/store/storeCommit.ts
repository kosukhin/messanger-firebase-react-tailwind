import { counterSlice } from "../../store/counterSlice";
import { groupSlice } from "../../store/groupSlice";
import { messageSlice } from "../../store/messageSlice";
import { store } from "../../store/store";
import { userSlice } from "../../store/userSlice";

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

export type StoreCommit = {
  action: string,
  payload?: any
}

export function storeCommit(model: StoreCommit) {
  if (actions[model.action]) {
    store.dispatch(actions[model.action](model.payload))
  }
}

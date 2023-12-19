import { counterSlice } from "../../store/counterSlice";
import { groupSlice } from "../../store/groupSlice";
import { messageSlice } from "../../store/messageSlice";
import { store } from "../../store/store";
import { userSlice } from "../../store/userSlice";
import { defineModelEffect } from "../base/I";
import { storeCommitModel } from "./storeCommitModel";

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

export const storeCommit = defineModelEffect<void>()(storeCommitModel, (model) => {
  if (actions[model.action]) {
    store.dispatch(actions[model.action](model.payload))
  }
})

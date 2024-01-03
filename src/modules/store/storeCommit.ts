import { counterSlice } from "../../store/counterSlice";
import { groupSlice } from "../../store/groupSlice";
import { messageSlice } from "../../store/messageSlice";
import { store } from "../../store/store";
import { userSlice } from "../../store/userSlice";

const { incremented, decremented } = counterSlice.actions;
const { setGroups } = groupSlice.actions;
const { setMessages } = messageSlice.actions;
const { setUsers } = userSlice.actions;

const actions: any = {
  incremented,
  decremented,
  setGroups,
  setMessages,
  setUsers,
};

export function storeCommit(action: string, payload?: any) {
  if (actions[action]) {
    store.dispatch(actions[action](payload));
  }
}

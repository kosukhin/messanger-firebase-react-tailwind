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

export class StoreCommit {
  constructor(
    public action: string,
    public payload?: any
  ) {}
}

export function storeCommit(...props: ConstructorParameters<typeof StoreCommit>) {
  const {action, payload} = new StoreCommit(...props);

  if (actions[action]) {
    store.dispatch(actions[action](payload))
  }
}

import { mountedHook } from "../../modules/hooks/mountedHook";
import { memoize } from "../../modules/memoize/memoize";
import { Message } from "../../modules/message/message";
import { messageService } from "../../modules/message/messageService";
import { state } from "../../modules/state/state";
import { storeCommit } from "../../modules/store/storeCommit";
import { storeSelector } from "../../modules/store/storeSelector";
import { User, user } from "../../modules/user/user";
import { userService } from "../../modules/user/userService";

export function appMessageController(props: { message: Message }) {
  const users = storeSelector<User[]>("users.users");
  const usersMap = memoize(() => {
    return users.reduce((acc: any, item: User) => {
      acc[item.id ?? item._id] = item;
      return acc;
    }, {});
  }, [users]);
  const message: Message = props.message;
  const theUser = state<User>(user());

  mountedHook(() => {
    userService.currentUser().then((user: User) => {
      theUser.set(user);
    });
  });

  const messagesAll: Message[] = storeSelector("messages.messages");
  const onDelete = (id: string) => async () => {
    await messageService.crud.deleteById(id, async () => {
      !messagesAll.length && storeCommit("setMessages", []);
    });
  };

  return {
    theUser: theUser.target(),
    message,
    usersMap,
    onDelete,
  };
}

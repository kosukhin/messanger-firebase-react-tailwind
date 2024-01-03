import { FormEvent } from "react";
import { Group } from "../../modules/group/group";
import { memoize } from "../../modules/memoize/memoize";
import { Message } from "../../modules/message/message";
import { router } from "../../modules/router/router";
import { storeSelector } from "../../modules/store/storeSelector";
import { profileService } from "../../modules/profile/profileService";
import { groupService } from "../../modules/group/groupService";
import { storeCommit } from "../../modules/store/storeCommit";

export function groupMessagesController() {
  const route = router<{ id: string }>();
  const messages = storeSelector<Message[]>("messages.messages");
  const groupItems = storeSelector<Group[]>("groups.groups");
  const groupMessages = memoize(() => {
    return messages
      .filter((message: Message) => {
        return message.groupId === route.id;
      })
      .sort((a, b) => a.time - b.time);
  }, [route.id, messages]);
  const group = memoize(() => {
    return groupItems.find((g) => g._id === route.id);
  }, [groupItems, route.id]);

  const onNewMessage = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const area = document.querySelector('[name="text"]') as HTMLTextAreaElement;
    area.value = "";
    await profileService.createMessage(String(formData.get("text")), route.id);
  };

  const onDeleteGroup = async (e: Event) => {
    e.preventDefault();
    await groupService.crud.deleteById(route.id, async () => {
      !groupItems.length && storeCommit("setGroups", []);
    });
  };

  return {
    group,
    groupMessages,
    onNewMessage,
    onDeleteGroup,
  };
}

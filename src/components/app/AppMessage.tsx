import { useEffect, useMemo, useState } from "react";
import { Message } from "../../modules/message/message";
import { messageService } from "../../modules/message/messageService";
import { storeCommit } from "../../modules/store/storeCommit";
import { useStoreSelector } from "../../modules/store/storeSelector";
import { User, user } from "../../modules/user/user";
import { userService } from "../../modules/user/userService";
import BaseButton from "../ui/BaseButton";

export default function AppMessage(props: any) {
  const users = useStoreSelector<User[]>('users.users')
  const usersMap = useMemo(() => {
    return users.reduce((acc: any, item: User) => {
      acc[item.id ?? item._id] = item
      return acc;
    }, {})
  }, [users])
  const message: Message = props.message
  const [theUser, setUser] = useState(user())

  useEffect(() => {
    userService.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  const messagesAll: Message[] = useStoreSelector('messages.messages')
  const onDelete = (id: string) => async () => {
    await messageService.crud.deleteById(id, async () => {
      !messagesAll.length && storeCommit('setMessages', [])
    })
  }

  return (<div className={'p-3 bg-message'}>
    <div className={'flex gap-2 items-center'}>
      <img className="w-10 h-10 rounded-full" src={usersMap[message.fromId]?.avatar} alt="Rounded avatar"/>
      {usersMap[message.fromId]?.name}
    </div>
    <div className={'mb-2 text-2xl'}>
      {message.text}
    </div>
    <div className={'mb-2'}>
      <span className={'mr-2'}>
      Отправлено:
      </span>
      {(new Date(message.time)).toLocaleString('ru')}
    </div>
    {theUser.id === message.fromId ? (
      <BaseButton onClick={onDelete(message._id)}>
        Удалить
      </BaseButton>
    ) : ''}
  </div>)
}

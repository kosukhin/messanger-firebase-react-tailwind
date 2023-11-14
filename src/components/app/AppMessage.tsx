import BaseButton from "../ui/BaseButton";
import {Message} from "../../modules/message/Message";
import {User} from "../../modules/user/User";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {takeInstance} from "../../modules/base/I";
import {StoreCommit} from "../../modules/store/StoreCommit";
import {messageService} from "../../modules/message/MessageService";
import {userService} from "../../modules/user/UserService";
import {storeCommitService} from "../../modules/store/StoreCommitService";

export default function AppMessage(props: any) {
  const users: User[] = useSelector((state: any) => {
    return state.users.users
  })
  const usersMap = useMemo(() => {
    return users.reduce((acc: any, item: User) => {
      acc[item.id] = item
      return acc;
    }, {})
  }, [users])
  const message: Message = props.message
  const [user, setUser] = useState(takeInstance(User, '', '', '', ''))

  useEffect(() => {
    userService.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  const messagesAll: Message[] = useSelector((state: any) => state.messages.messages)
  const onDelete = (id: string) => async () => {
    await messageService.crud.deleteById(id, async () => {
      if (messagesAll.length !== 1) {
        return;
      }

      await storeCommitService.apply(takeInstance(
        StoreCommit,
        'setMessages',
        []
      ))
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
    {user.id === message.fromId ? (
      <BaseButton onClick={onDelete(message._id)}>
        Удалить
      </BaseButton>
    ) : ''}
  </div>)
}

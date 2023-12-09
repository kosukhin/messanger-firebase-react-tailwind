import BaseButton from "../ui/BaseButton";
import {MessageModel} from "../../modules/message/MessageModel";
import {userModel, UserModel} from "../../modules/user/UserModel";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {storeCommitModel} from "../../modules/store/StoreCommitModel";
import {messageService} from "../../modules/message/messageService";
import {userService} from "../../modules/user/userService";
import {storeCommit} from "../../modules/store/storeCommit";

export default function AppMessage(props: any) {
  const users: UserModel[] = useSelector((state: any) => {
    return state.users.users
  })
  const usersMap = useMemo(() => {
    return users.reduce((acc: any, item: UserModel) => {
      acc[item.id] = item
      return acc;
    }, {})
  }, [users])
  const message: MessageModel = props.message
  const [user, setUser] = useState(userModel({
    _id: '', id: '', name: '', avatar: ''
  }))

  useEffect(() => {
    userService.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  const messagesAll: MessageModel[] = useSelector((state: any) => state.messages.messages)
  const onDelete = (id: string) => async () => {
    await messageService.crud.deleteById(id, async () => {
      if (messagesAll.length !== 1) {
        return;
      }

      await storeCommit({
        action: 'setMessages',
        payload: []
      })
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

import BaseButton from "../ui/BaseButton";
import {Message} from "../../modules/message/Message";
import {takeServices} from "../../modules/base/takeServices";
import {User} from "../../modules/user/User";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {takeInstance} from "../../modules/base/I";

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
    const {users} = takeServices()
    users.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  const {messages} = takeServices()

  const onDelete = (id: string) => async () => {
    await messages.crud.deleteById(id)
  }

  return (<div className={'p-3 bg-message'}>
    <div className={'flex gap-2 items-center'}>
      <img className="w-10 h-10 rounded-full" src={usersMap[message.fromId]?.avatar} alt="Rounded avatar"/>
      {usersMap[message.fromId]?.name}
    </div>
    <div className={'mb-2 text-2xl'}>
      {message.text}
    </div>
    {user.id === message.fromId ? (
      <BaseButton onClick={onDelete(message._id)}>
        Удалить
      </BaseButton>
    ) : ''}
  </div>)
}

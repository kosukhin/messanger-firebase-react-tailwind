import BaseButton from "../ui/BaseButton";
import {FormEvent, useEffect, useState} from "react";
import {userService} from "../../modules/user/userService";
import { user } from "../../modules/user/user";

export default function Profile() {
  const [theUser, setTheUser] = useState(user())

  useEffect(() => {
    userService.currentUser().then(user => {
      setTheUser(user)
    })
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    await userService.crud.update({
      ...theUser,
      name: String(formData.get('name')),
      avatar: String(formData.get('avatar'))
    })
  }

  return (<div>
    <h1 className={'text-6xl mb-4'}>Профиль</h1>
    <div className={'mb-2'}>
      <img className="w-20 h-20 rounded-full" src={theUser.avatar} alt="Rounded avatar"/>
    </div>
    <form onSubmit={onSave}>
      <div className={'mb-2'}>
        <input className={'p-2'} key={'name' + theUser.name} defaultValue={theUser.name} placeholder={'Имя'} type={'text'} name={'name'}/>
      </div>
      <div className={'mb-2'}>
        <input className={'p-2'} key={'avatar' + theUser.avatar} defaultValue={theUser.avatar} placeholder={'Аватар'} type={'text'} name={'avatar'}/>
      </div>
      <BaseButton>Сохранить</BaseButton>
    </form>
  </div>)
}

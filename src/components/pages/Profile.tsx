import {User} from "../../modules/user/User";
import BaseButton from "../ui/BaseButton";
import {FormEvent, useEffect, useState} from "react";
import {takeInstance, takeService} from "../../modules/base/I";
import {UserService} from "../../modules/user/UserService";

export default function Profile() {
  const users = takeService(UserService)
  const [user, setUser] = useState(takeInstance(User, '', '', '', ''))

  useEffect(() => {
    users.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const newUser = user.takeChanged({
      name: String(formData.get('name')),
      avatar: String(formData.get('avatar'))
    })
    console.log(newUser)
    await users.crud.update(newUser)
  }

  return (<div>
    <h1 className={'text-6xl mb-4'}>Профиль</h1>
    <div className={'mb-2'}>
      <img className="w-20 h-20 rounded-full" src={user.avatar} alt="Rounded avatar"/>
    </div>
    <form onSubmit={onSave}>
      <div className={'mb-2'}>
        <input className={'p-2'} defaultValue={user.name} placeholder={'Имя'} type={'text'} name={'name'}/>
      </div>
      <div className={'mb-2'}>
        <input className={'p-2'} defaultValue={user.avatar} placeholder={'Аватар'} type={'text'} name={'avatar'}/>
      </div>
      <BaseButton>Сохранить</BaseButton>
    </form>
  </div>)
}

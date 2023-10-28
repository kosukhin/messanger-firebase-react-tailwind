import {FormEvent, useEffect} from "react";
import {profile} from "../models/profile";
import init = profile.initProfile;
import createGroup = profile.createGroup;

function Profile() {
  useEffect(() => {
    init()
  }, [])

  const onSaveGroup = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    console.log('savegroup', formData.get('name'))
    await createGroup(String(formData.get('name')))
  }

  const onSaveMessage = () => {
    console.log('save message')
  }

  return (<div>
    <h1 className={"mb-2"}>Профиль</h1>
    <h2>Добавить группу</h2>
    <form onSubmit={onSaveGroup}>
      <div>
        <input name={"name"} type={"text"}/>
      </div>
      <div className={"mb-2"}>
        <button type={"submit"}>
          Сохранить
        </button>
      </div>
    </form>
    <hr/>
    <h2>
      Добавить сообщение
    </h2>
    <div>
      <label className={"block"}>Группа</label>
      <input type={"text"}/>
    </div>
    <div>
      <label className={"block"}>Сообщение</label>
      <textarea></textarea>
    </div>
    <div>
      <button onClick={onSaveMessage}>Сохранить</button>
    </div>
  </div>)
}

export default Profile

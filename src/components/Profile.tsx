import {FormEvent, useEffect} from "react";
import {profile} from "../models/profile";
import init = profile.initProfile;
import createGroup = profile.createGroup;
import createMessage = profile.createMessage;

function Profile() {
  useEffect(() => {
    init()
  }, [])

  const onSaveGroup = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    await createGroup(String(formData.get('name')))
  }

  const onSaveMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log(e.target)
    const formData = new FormData(e.target as HTMLFormElement)
    await createMessage(
      String(formData.get('text')),
      String(formData.get('groupId')),
    )
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
    <form onSubmit={onSaveMessage}>
      <div>
        <label className={"block"}>Группа</label>
        <input name={"groupId"} type={"text"}/>
      </div>
      <div>
        <label className={"block"}>Сообщение</label>
        <textarea name={"text"}></textarea>
      </div>
      <div>
        <button type={"submit"}>Сохранить</button>
      </div>
    </form>
  </div>)
}

export default Profile

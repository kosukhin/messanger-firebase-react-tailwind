import {FormEvent, useEffect} from "react";
import {useSelector} from "react-redux";
import {takeInstance} from "../modules/base/I";
import {StoreCommit} from "../modules/store/StoreCommit";
import {takeServices} from "../modules/base/takeServices";

function Profile() {
  const count = useSelector((state: any) => state.counter.value)
  useEffect(() => {
    const {profile} = takeServices()
    profile.initProfile()
  }, [])

  const onSaveGroup = async (e: FormEvent) => {
    e.preventDefault();
    const {profile} = takeServices()
    const formData = new FormData(e.target as HTMLFormElement)
    await profile.createGroup(String(formData.get('name')))
  }

  const onSaveMessage = async (e: FormEvent) => {
    e.preventDefault();
    const {profile} = takeServices()
    const formData = new FormData(e.target as HTMLFormElement)
    await profile.createMessage(
      String(formData.get('text')),
      String(formData.get('groupId')),
    )
  }

  const increment = async () => {
    const {storeCommit} = takeServices()
    await storeCommit.apply(takeInstance(StoreCommit, 'increment'))
  }

  return (<div>
    <h1 className={"mb-2"}>Профиль</h1>
    {count}
    <div>
      <button onClick={increment}>Увеличить</button>
    </div>
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

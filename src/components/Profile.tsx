import {FormEvent, useEffect} from "react";
import {useSelector} from "react-redux";
import {takeInstance} from "../modules/base/I";
import {StoreCommit} from "../modules/store/StoreCommit";
import {takeServices} from "../modules/base/takeServices";
import BaseButton from "./ui/BaseButton";

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

  const getGroup = () => {
    const {profile} = takeServices()
    profile.getGroup('0lFf4hrVHIlWPMyaig5n');
  }

  const getGroups = () => {
    const {profile} = takeServices()
    profile.getAllGroups();
  }

  const onChangeGroup = async (e: FormEvent) => {
    e.preventDefault();
    const {profile} = takeServices()
    const formData = new FormData(e.target as HTMLFormElement)
    await profile.updateGroup({
      _id: "0lFf4hrVHIlWPMyaig5n",
      name: String(formData.get('name')),
      id: String(formData.get('id'))
    })
  }

  const findById = () => {
    const {profile} = takeServices()
    profile.findById('63a85a02-fb3d-4824-b875-baf4d810f149');
  }

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    const {profile} = takeServices()
    const formData = new FormData(e.target as HTMLFormElement)
    await profile.deleteById(String(formData.get('id')))
  }

  return (<div>
    <h1 className={"mb-2"}>Профиль</h1>
    {count}
    <div className={'mt-2'}>
      <BaseButton onClick={increment}>Увеличить</BaseButton>
    </div>
    <hr className={'mb-3 mt-3'}/>
    <BaseButton onClick={getGroup}>Получить одну запись по _ID</BaseButton>
    <hr className={'mb-3 mt-3'}/>
    <BaseButton onClick={getGroups}>Получить список</BaseButton>
    <hr className={'mb-3 mt-3'}/>
    <BaseButton onClick={findById}>Найти по ID</BaseButton>
    <hr className={'mb-3 mt-3'}/>
    <h2>Обновить группу</h2>
    <form onSubmit={onChangeGroup}>
      <div className={'mb-2'}>
        <input placeholder={'id'} name={"id"} type={"text"}/>
      </div>
      <div className={'mb-2'}>
        <input placeholder={'name'} name={"name"} type={"text"}/>
      </div>
      <div className={"mb-2"}>
        <BaseButton type={"submit"}>
          Обновить
        </BaseButton>
      </div>
    </form>
    <hr className={'mb-3 mt-3'}/>
    <h2>Удалить группу</h2>
    <form onSubmit={onDelete}>
      <div className={'mb-2'}>
        <input placeholder={'id'} name={"id"} type={"text"}/>
      </div>
      <div className={"mb-2"}>
        <BaseButton type={"submit"}>
          Удалить
        </BaseButton>
      </div>
    </form>
    <hr className={'mb-3 mt-3'}/>
    <h2>Создать группу</h2>
    <form onSubmit={onSaveGroup}>
      <div className={'mb-2'}>
        <input name={"name"} type={"text"}/>
      </div>
      <div className={"mb-2"}>
        <BaseButton type={"submit"}>
          Сохранить
        </BaseButton>
      </div>
    </form>
    <hr/>
    <h2>
      Создать сообщение
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
        <BaseButton type={"submit"}>Сохранить</BaseButton>
      </div>
    </form>
  </div>)
}

export default Profile

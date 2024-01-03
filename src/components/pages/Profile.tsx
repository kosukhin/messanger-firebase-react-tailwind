import { profileController } from "../../controllers/pages/profileController";
import BaseButton from "../ui/BaseButton";

export default function Profile() {
  const {
    onSave,
    theUser
  } = profileController()

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

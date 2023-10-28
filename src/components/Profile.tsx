import {useEffect} from "react";
import {profile} from "../models/profile";
import init = profile.init;

function Profile() {
  useEffect(() => {
    init()
  }, [])

  const onSave = () => {
    console.log('save')
  }

  return (<div>
    <h1>Профиль</h1>
    <div className="mb-1">
      <input className="p-2" placeholder="Имя" name="name"/>
    </div>
    <div className="mb-1">
      <input className="p-2" placeholder="Ключевое слово" name="name"/>
    </div>
    <div>
      <button type="submit" onClick={onSave}>Сохранить</button>
    </div>
  </div>)
}

export default Profile

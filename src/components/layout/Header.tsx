import {useEffect, useState} from "react";
import {takeInstance, takeService} from "../../modules/base/I";
import {User} from "../../modules/user/User";
import {UserService} from "../../modules/user/UserService";

function Header() {
  const [user, setUser] = useState(takeInstance(User, '', '', '', ''))

  useEffect(() => {
    const users = takeService(UserService)
    users.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  return (<header className="p-4 bg-header flex gap-2">
    <a href="/">Firebase-messenger</a>
    <a className={'block ml-auto'} href="/messages">Все сообщения</a>
    <a className={'block'} href="/profile">Профиль</a>
    <img className="w-6 h-6 rounded-full" src={user.avatar} alt="Rounded avatar"/>
  </header>)
}

export default Header

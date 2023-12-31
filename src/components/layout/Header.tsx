import {useEffect, useState} from "react";
import {userService} from "../../modules/user/userService";
import { user } from "../../modules/user/user";

function Header() {
  const [theUser, setUser] = useState(user())

  useEffect(() => {
    userService.currentUser().then(user => {
      setUser(user)
    })
  }, [])

  return (<header className="p-4 bg-header flex gap-2">
    <a href="/">Firebase-messenger</a>
    <a className={'block ml-auto'} href="/messages">Все сообщения</a>
    <a className={'block'} href="/profile">Профиль</a>
    <img className="w-6 h-6 rounded-full" src={theUser.avatar} alt="Rounded avatar"/>
  </header>)
}

export default Header

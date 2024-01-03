import { mountedHook } from "../../modules/hooks/mountedHook";
import { state } from "../../modules/state/state";
import { User, user } from "../../modules/user/user";
import { userService } from "../../modules/user/userService";

export default function Header() {
  const theUser = state<User>(user())

  mountedHook(() => {
    userService.currentUser().then(user => {
      theUser.set(user)
    })
  })

  return (<header className="p-4 bg-header flex gap-2">
    <a href="/">Firebase-messenger</a>
    <a className={'block ml-auto'} href="/messages">Все сообщения</a>
    <a className={'block'} href="/profile">Профиль</a>
    <img className="w-6 h-6 rounded-full" src={theUser.get().avatar} alt="Rounded avatar"/>
  </header>)
}

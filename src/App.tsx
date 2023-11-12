import React, {useEffect} from 'react';
import './assets/index.css'
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import {takeService} from "./modules/base/I";
import {GroupService} from "./modules/group/GroupService";
import {MessageService} from "./modules/message/MessageService";
import {ProfileService} from "./modules/profile/ProfileService";
import {UserService} from "./modules/user/UserService";

function App() {
  useEffect(() => {
    const groups = takeService(GroupService)
    const messages = takeService(MessageService)
    const profile = takeService(ProfileService)
    const users = takeService(UserService)
    groups.watchGroups()
    messages.watchMessages()
    profile.initProfile()
    users.watchUsers()
  }, [])

  return (
    <div className="flex flex-col flex-1 h-screen bg-main">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;

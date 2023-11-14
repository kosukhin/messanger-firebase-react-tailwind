import React, {useEffect} from 'react';
import './assets/index.css'
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import {groupService} from "./modules/group/GroupService";
import {messageService} from "./modules/message/MessageService";
import {profileService} from "./modules/profile/ProfileService";
import {userService} from "./modules/user/UserService";

function App() {
  useEffect(() => {
    groupService.watchGroups()
    messageService.watchMessages()
    profileService.initProfile()
    userService.watchUsers()
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

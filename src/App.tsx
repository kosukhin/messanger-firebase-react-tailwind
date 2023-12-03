import React, {useEffect} from 'react';
import './assets/index.css'
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import {groupService} from "./modules/group/groupService";
import {messageService} from "./modules/message/messageService";
import {profileService} from "./modules/profile/profileService";
import {userService} from "./modules/user/userService";

function App() {
  useEffect(() => {
    Promise.all([
      groupService.watchGroups(),
      messageService.watchMessages(),
      profileService.initProfile(),
      userService.watchUsers()
    ]).catch(e => {
      throw e
    })
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

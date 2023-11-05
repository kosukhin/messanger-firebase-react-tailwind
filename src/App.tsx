import React, {useEffect} from 'react';
import './assets/index.css'
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import {takeServices} from "./modules/base/takeServices";

function App() {
  useEffect(() => {
    const {groups} = takeServices()
    groups.watchGroups()
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

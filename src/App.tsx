import React from 'react';
import './assets/index.css'
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="flex-1 h-screen bg-main">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;

import Navbar from "../Navbar";
import Profile from "../Profile";

function Body() {
  return (<div className="flex flex-grow flex-row">
    <Navbar/>
    <main className="p-4 flex-grow bg-main">
      <Profile/>
    </main>
  </div>)
}

export default Body

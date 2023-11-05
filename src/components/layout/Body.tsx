import Navbar from "../Navbar";
import {RouterProvider,} from "react-router-dom";
import {router} from "../../router";

function Body() {
  return (<div className="flex flex-grow flex-row">
    <Navbar/>
    <main className="p-4 flex-grow bg-main">
      <RouterProvider router={router}/>
    </main>
  </div>)
}

export default Body

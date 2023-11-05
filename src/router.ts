import Home from "./components/pages/Home";
import {createBrowserRouter} from "react-router-dom";
import Messages from "./components/pages/Messages";
import Profile from "./components/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/messages",
    Component: Messages,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);

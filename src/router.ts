import Home from "./components/pages/Home";
import {createBrowserRouter} from "react-router-dom";
import Messages from "./components/pages/Messages";
import Profile from "./components/pages/Profile";
import GroupMessages, {loader as groupLoader} from "./components/pages/GroupMessages";

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
    path: "/messages/:id",
    Component: GroupMessages,
    loader: groupLoader
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);

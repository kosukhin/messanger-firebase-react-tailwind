import { createBrowserRouter } from "react-router-dom";
import GroupMessages, { loader as groupLoader } from "./components/pages/GroupMessages";
import Home from "./components/pages/Home";
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
    path: "/messages/:id",
    Component: GroupMessages,
    loader: groupLoader
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);

import Home from "./components/pages/Home";
import {createBrowserRouter} from "react-router-dom";
import Messages from "./components/pages/Messages";
import Profile from "./components/pages/Profile";
import Test from "./components/pages/Test";

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
  {
    path: "/test",
    Component: Test,
  },
]);

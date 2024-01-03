import { FormEvent } from "react";
import { mountedHook } from "../../modules/hooks/mountedHook";
import { state } from "../../modules/state/state";
import { User, user } from "../../modules/user/user";
import { userService } from "../../modules/user/userService";

export function profileController() {
  const theUser = state<User>(user());

  mountedHook(() => {
    userService.currentUser().then((user) => {
      theUser.set(user);
    });
  });

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await userService.crud.update({
      ...theUser.get(),
      name: String(formData.get("name")),
      avatar: String(formData.get("avatar")),
    });
  };

  return {
    theUser: theUser.target(),
    onSave,
  };
}

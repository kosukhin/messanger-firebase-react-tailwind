import { FormEvent } from "react";
import { Group } from "../modules/group/group";
import { storeSelector } from "../modules/store/storeSelector";
import { hash } from "../modules/security/hash";
import { groupService } from "../modules/group/groupService";

export function navbarController() {
  const groups: Group[] = storeSelector("groups.groups");

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const id = hash();
    const formData = new FormData(e.target as HTMLFormElement);
    await groupService.crud.create({
      id,
      name: String(formData.get("name")),
    });
  };

  return {
    groups,
    onSave,
  }
}

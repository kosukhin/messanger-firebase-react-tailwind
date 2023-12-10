import { FormEvent } from "react";
import { useSelector } from "react-redux";
import { GroupModel } from "../modules/group/groupModel";
import { groupService } from "../modules/group/groupService";
import { hashModel } from "../modules/security/hashModel";
import { hash } from "../modules/security/hash";
import BaseButton from "./ui/BaseButton";

function Navbar() {
  const groups: GroupModel[] = useSelector((state: any) => state.groups.groups)

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const id = await hash(hashModel());
    const formData = new FormData(e.target as HTMLFormElement)
    await groupService.crud.create({
      id: id.value,
      name: String(formData.get('name')),
    })
  }

  return (<nav className="p-4 bg-navbar w-full max-w-[200px] flex flex-col">
    {groups ? groups.map(group => (
      <div key={group.id}>
        <a href={`/messages/${group._id}`}>
          {group.name}
        </a>
      </div>
    )) : ''}
    <form className={'mt-auto'} onSubmit={onSave}>
      <div className={'mb-2'}>
        <input className={'p-2 w-[100%] box-border'} placeholder={'Новая группа'} name={"name"} type={"text"}/>
      </div>
      <div className={"mb-2"}>
        <BaseButton type={"submit"}>
          Сохранить
        </BaseButton>
      </div>
    </form>
  </nav>)
}

export default Navbar

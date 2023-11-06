import {useSelector} from "react-redux";
import {Group} from "../modules/group/Group";
import BaseButton from "./ui/BaseButton";
import {FormEvent} from "react";
import {takeServices} from "../modules/base/takeServices";
import {Hash} from "../modules/security/Hash";
import {takeInstance} from "../modules/base/I";

function Navbar() {
  const groups: Group[] = useSelector((state: any) => state.groups.groups)

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const {groups, hash} = takeServices()
    const id = await hash.apply<Hash>(takeInstance(Hash, Hash.hashUuid));
    const formData = new FormData(e.target as HTMLFormElement)
    await groups.crud.create({
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

import {useLoaderData} from "react-router-dom";
import {Message} from "../../modules/message/Message";
import {useSelector} from "react-redux";
import {FormEvent, useMemo} from "react";
import BaseButton from "../ui/BaseButton";
import {takeServices} from "../../modules/base/takeServices";
import AppMessage from "../app/AppMessage";

export async function loader({params}: any) {
  return {
    id: params.id
  };
}

export default function GroupMessages() {
  const ld = useLoaderData() as any;
  const messages: Message[] = useSelector((state: any) => state.messages.messages)
  const groupMessages = useMemo(() => {
    return messages.filter((message: Message) => {
      return message.groupId === ld.id
    })
  }, [ld.id, messages])

  const onNewMessage = async (e: FormEvent) => {
    e.preventDefault();
    const {profile} = takeServices()
    const formData = new FormData(e.target as HTMLFormElement)
    const area = document.querySelector('[name="text"]') as HTMLTextAreaElement
    area.value = ''
    await profile.createMessage(
      String(formData.get('text')),
      ld.id,
    )
  }

  const {groups} = takeServices()
  const onDeleteGroup = async (e: Event) => {
    e.preventDefault();
    await groups.crud.deleteById(ld.id)
  }

  return (<div className={'flex flex-col flex-grow'}>
    {groupMessages && !groupMessages.length ? 'Нет сообщений' : ''}
    {groupMessages ? groupMessages.map(message => (
      <div key={message._id} className={'mb-2'}>
        <AppMessage message={message}/>
      </div>
    )) : 'Нет сооб'}
    <div className={'mt-auto'}>
      <form onSubmit={onNewMessage}>
        <div className={'mb-2'}>
          <label className={"block"}>Сообщение</label>
          <textarea placeholder={'Новое сообщение'} className={'block w-[100%] p-2'} name={"text"}></textarea>
        </div>
        <div className={'gap-2 flex'}>
          <BaseButton type={"submit"}>Отправить</BaseButton>
          <BaseButton onClick={onDeleteGroup}>Удалить группу</BaseButton>
        </div>
      </form>
    </div>
  </div>)
}

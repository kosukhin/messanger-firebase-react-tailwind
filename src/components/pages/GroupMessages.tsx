import { groupMessagesController } from "../../controllers/pages/groupMessagesController";
import AppMessage from "../app/AppMessage";
import BaseButton from "../ui/BaseButton";

export async function loader({params}: any) {
  return {
    id: params.id
  };
}

export default function GroupMessages() {
  const {
    groupMessages,
    group,
    onNewMessage,
    onDeleteGroup
  } = groupMessagesController()

  return (<div className={'flex flex-col flex-grow'}>
    <div className={'p-3 bg-navbar text-center mb-2'}>
      {group?.name ?? 'Группа не найдена'}
    </div>
    {groupMessages && !groupMessages.length ? 'Нет сообщений' : ''}
    {groupMessages ? groupMessages.map(message => (
      <div key={message._id} className={'mb-2'}>
        <AppMessage message={message}/>
      </div>
    )) : 'Нет сообщений'}
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

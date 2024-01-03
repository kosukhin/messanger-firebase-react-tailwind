import { Message } from "../../modules/message/message";
import { storeSelector } from "../../modules/store/storeSelector";
import AppMessage from "../app/AppMessage";

export default function Messages() {
  const messages = storeSelector<Message[]>('messages.messages')

  return (<div className={'flex-grow'}>
    <h1 className={'text-6xl mb-4'}>Все сообщения</h1>
    {!messages.length ? 'Нет сообщений' : ''}
    {messages ? messages.map(message => (
      <div key={message._id} className={'mb-2'}>
        <AppMessage message={message}/>
      </div>
    )) : ''}
  </div>)
}

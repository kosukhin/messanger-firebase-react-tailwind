import {useSelector} from "react-redux";
import {Message} from "../../modules/message/Message";
import AppMessage from "../app/AppMessage";

export default function Messages() {
  const messages: Message[] = useSelector((state: any) => state.messages.messages)

  return (<div className={'flex-grow'}>
    {!messages.length ? 'Нет сообщений' : ''}
    {messages ? messages.map(message => (
      <div key={message._id} className={'mb-2'}>
        <AppMessage message={message}/>
      </div>
    )) : ''}
  </div>)
}

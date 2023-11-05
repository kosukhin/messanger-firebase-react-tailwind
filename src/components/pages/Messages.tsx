import {useSelector} from "react-redux";
import {Message} from "../../modules/message/Message";

export default function Messages() {
  const messages: Message[] = useSelector((state: any) => state.messages.messages)

  return (<div>
    {messages ? messages.map(message => (
      <div key={message._id}>
        {message.text}
      </div>
    )) : ''}
  </div>)
}

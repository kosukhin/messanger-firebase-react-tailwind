import BaseButton from "../ui/BaseButton";
import {Message} from "../../modules/message/Message";
import {takeServices} from "../../modules/base/takeServices";

export default function AppMessage(props: any) {
  const message: Message = props.message

  const {messages} = takeServices()

  const onDelete = (id: string) => async () => {
    await messages.crud.deleteById(id)
  }

  return (<div className={'p-3 bg-message'}>
    <div className={'mb-2'}>
      {message.text}
    </div>
    <BaseButton onClick={onDelete(message._id)}>
      Удалить
    </BaseButton>
  </div>)
}

export const MESSAGE_COLLECTION = 'messages'

export class Message {
  constructor(
    public _id: string,
    public groupId: string,
    public text: string,
    public fromId: string,
    public time: number
  ) {}
}

export const message = (
  ...props: ConstructorParameters<typeof Message>
) => new Message(...props)

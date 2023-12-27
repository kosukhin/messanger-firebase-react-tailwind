export const MESSAGE_COLLECTION = 'messages'

export type Message = {
  _id: string,
  groupId: string,
  text: string,
  fromId: string,
  time: number
}

export class MessageModel {
  static collectionName = 'messages'

  constructor(
    readonly _id: string,
    readonly groupId: string,
    readonly text: string,
    readonly fromId: string,
    readonly time: number
  ) {
  }
}

export class Group {
  static collectionName = 'groups'

  constructor(
    readonly _id: string,
    readonly id: string,
    readonly name: string
  ) {
  }
}

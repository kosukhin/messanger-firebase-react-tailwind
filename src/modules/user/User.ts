export class User {
  static collectionName = 'users';
  static defaultName = 'Аноним';
  static defaultAvatar = 'https://i.pravatar.cc/300';

  constructor(
    readonly _id: string,
    readonly id: string,
    readonly name: string,
    readonly avatar: string
  ) {
  }
}

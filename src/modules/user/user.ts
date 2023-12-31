export const USERS_COLLECTION = 'users';
export const DEFAULT_NAME = 'Аноним';
export const DEFAULT_AVATAR = 'https://i.pravatar.cc/300';

export class User {
  constructor(
    public _id: string = '',
    public id: string = '',
    public name: string = DEFAULT_NAME,
    public avatar: string = DEFAULT_AVATAR
  ) {}
}

export const user = (
  ...props: ConstructorParameters<typeof User>
) => new User(...props)

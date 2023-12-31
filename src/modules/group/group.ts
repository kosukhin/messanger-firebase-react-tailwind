export const GROUP_COLLECTION = 'groups'

export class Group {
  constructor(
    public _id: string,
    public id: string,
    public name: string
  ) {}
}

export const group = (
  ...props: ConstructorParameters<typeof Group>
) => new Group(...props)

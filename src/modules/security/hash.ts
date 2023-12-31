import { v4 as uuidv4 } from "uuid";

export const HASH_UUID = 'uuid';

export class Hash {
  constructor(
    public type: string = HASH_UUID
  ) {}
}

export function hash(...props: ConstructorParameters<typeof Hash>) {
  const {type} = new Hash(...props)

  if (type === 'uuid') {
    return uuidv4()
  }

  return ''
}

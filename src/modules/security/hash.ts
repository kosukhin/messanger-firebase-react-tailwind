import { v4 as uuidv4 } from "uuid";

export const HASH_UUID = 'uuid';

export type Hash = {
  type: string,
  value: string
}

export const hashDefaults = {
  value: '',
  type: HASH_UUID
}

export function hash(model?: Hash) {
  if (model?.type === 'uuid') {
    return {
      ...hashDefaults,
      ...model,
      value: uuidv4()
    }
  }

  return {
    ...hashDefaults,
    ...model
  }
}

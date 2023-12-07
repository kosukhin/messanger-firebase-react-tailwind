import {defineModelFactory} from "../base/I";

export const HASH_UUID = 'uuid';

export type HashModel = Readonly<{
  type: string,
  value: string
}>

export const hashModel = defineModelFactory<HashModel>()({
  value: '',
  type: HASH_UUID
})

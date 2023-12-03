import {defineModelFactory} from "../base/I";

export class HashModel {
  static hashUuid = 'uuid';

  constructor(
    readonly type: string = HashModel.hashUuid,
    readonly value: string = ''
  ) {
  }
}

export const hashModel = defineModelFactory<HashModel>({
  value: '',
  type: HashModel.hashUuid
})

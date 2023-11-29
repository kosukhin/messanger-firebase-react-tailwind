export class Hash {
  static hashUuid = 'uuid';

  constructor(
    readonly type: string = Hash.hashUuid,
    readonly value: string = ''
  ) {
  }
}

type FirebaseActions = 'add' | 'update' | 'remove' | 'get' | 'list' | 'onCollection' | 'onDocument'

export class Firebase {
  constructor(
    readonly action: FirebaseActions,
    readonly collection: string,
    readonly data: Record<string, any>,
    readonly id?: string,
    readonly isDone = false,
    readonly result: any = null
  ) {
  }
}

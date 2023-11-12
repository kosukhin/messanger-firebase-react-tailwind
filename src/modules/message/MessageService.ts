import {BaseService} from "../base/BaseService";
import {takeInstance, takeService} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {StoreCommit} from "../store/StoreCommit";
import {Message} from "./Message";
import {FirebaseCrud, FirebaseService} from "../firebase/FirebaseService";
import {StoreCommitService} from "../store/StoreCommitService";

export class MessageService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const firebase = takeService(FirebaseService)
    this.crud = firebase.buildCrud(Message.collectionName)
  }

  async watchMessages() {
    const firebase = takeService(FirebaseService)
    const storeCommit = takeService(StoreCommitService)
    await firebase.apply(takeInstance(Firebase, 'onCollection', Message.collectionName, {
      async onData(data: Message[]) {
        console.log('new messages')
        await storeCommit.apply(takeInstance(
          StoreCommit,
          'setMessages',
          data
        ))
      },
    }))
  }
}

import {BaseService} from "../base/BaseService";
import {takeServices} from "../base/takeServices";
import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {StoreCommit} from "../store/StoreCommit";
import {Message} from "./Message";
import {FirebaseCrud} from "../firebase/FirebaseService";

export class MessageService extends BaseService {
  crud: FirebaseCrud<any>

  constructor() {
    super();
    const {firebase} = takeServices()
    this.crud = firebase.buildCrud(Message.collectionName)
  }

  async watchMessages() {
    const {firebase, storeCommit} = takeServices()
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

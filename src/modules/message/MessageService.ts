import {BaseService} from "../base/BaseService";
import {takeServices} from "../base/takeServices";
import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {StoreCommit} from "../store/StoreCommit";
import {Message} from "./Message";

export class MessageService extends BaseService {
  async watchMessages() {
    const {firebase, storeCommit} = takeServices()
    await firebase.apply(takeInstance(Firebase, 'onCollection', Message.collectionName, {
      async onData(data: Message[]) {
        await storeCommit.apply(takeInstance(
          StoreCommit,
          'setMessages',
          data
        ))
      },
    }))
  }
}

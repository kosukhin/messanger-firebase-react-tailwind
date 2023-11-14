import {takeInstance} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {StoreCommit} from "../store/StoreCommit";
import {Message} from "./Message";
import {firebaseService} from "../firebase/FirebaseService";
import {storeCommitService} from "../store/StoreCommitService";

export namespace messageService {
  export const crud = firebaseService.buildCrud(Message.collectionName)

  export async function watchMessages() {
    await firebaseService.apply(takeInstance(Firebase, 'onCollection', Message.collectionName, {
      async onData(data: Message[]) {
        await storeCommitService.apply(takeInstance(
          StoreCommit,
          'setMessages',
          data
        ))
      },
    }))
  }
}

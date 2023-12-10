import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { MESSAGE_COLLECTION, MessageModel } from "./messageModel";

export namespace messageService {
  export const crud = firebaseService.buildCrud(MESSAGE_COLLECTION)

  export async function watchMessages() {
    await firebase({
      action: 'onCollection',
      collection: MESSAGE_COLLECTION,
      data: {
        async onData(data: MessageModel[]) {
          await storeCommit({
            action: 'setMessages',
            payload: data
          })
        },
      }
    })
  }
}

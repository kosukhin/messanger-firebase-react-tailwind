import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { MessageModel } from "./MessageModel";

export namespace messageService {
  export const crud = firebaseService.buildCrud(MessageModel.collectionName)

  export async function watchMessages() {
    await firebase({
      action: 'onCollection',
      collection: MessageModel.collectionName,
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

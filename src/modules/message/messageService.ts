import { firebaseDefaults } from './../firebase/firebase';
import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { MESSAGE_COLLECTION, Message } from "./message";

export namespace messageService {
  export const crud = firebaseService.buildCrud(MESSAGE_COLLECTION)

  export async function watchMessages() {
    await firebase({
      ...firebaseDefaults,
      action: 'onCollection',
      collection: MESSAGE_COLLECTION,
      data: {
        async onData(data: Message[]) {
          storeCommit({
            action: 'setMessages',
            payload: data
          })
        },
      }
    })
  }
}

import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { MESSAGE_COLLECTION, Message } from "./message";

export namespace messageService {
  export const crud = firebaseService.buildCrud(MESSAGE_COLLECTION)

  export async function watchMessages() {
    await firebase('onCollection', MESSAGE_COLLECTION, {
      async onData(data: Message[]) {
        storeCommit('setMessages', data)
      },
    })
  }
}

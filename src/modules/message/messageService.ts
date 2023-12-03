import {firebaseModel} from "../firebase/FirebaseModel";
import {storeCommitModel} from "../store/StoreCommitModel";
import {MessageModel} from "./MessageModel";
import {firebaseService} from "../firebase/firebaseService";
import {firebase} from "../firebase/firebase";
import {storeCommit} from "../store/storeCommit";

export namespace messageService {
  export const crud = firebaseService.buildCrud(MessageModel.collectionName)

  export async function watchMessages() {
    await firebase(firebaseModel({
      action: 'onCollection',
      collection: MessageModel.collectionName,
      data: {
        async onData(data: MessageModel[]) {
          await storeCommit(storeCommitModel({
            action: 'setMessages',
            payload: data
          }))
        },
      }
    }))
  }
}

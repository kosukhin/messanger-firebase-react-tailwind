import {create} from "../base/I";
import {Firebase} from "../firebase/Firebase";
import {StoreCommit} from "../store/StoreCommit";
import {Message} from "./Message";
import {firebaseService} from "../firebase/firebaseService";
import {firebaseEffect} from "../firebase/firebaseEffect";
import {storeCommitEffect} from "../store/storeCommitEffect";

export namespace messageService {
  export const crud = firebaseService.buildCrud(Message.collectionName)

  export async function watchMessages() {
    await firebaseEffect(create(Firebase, 'onCollection', Message.collectionName, {
      async onData(data: Message[]) {
        await storeCommitEffect(create(
          StoreCommit,
          'setMessages',
          data
        ))
      },
    }))
  }
}

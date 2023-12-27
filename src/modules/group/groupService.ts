import { firebaseDefaults } from './../firebase/firebase';
import { firebase } from "../firebase/firebase";
import { firebaseService } from "../firebase/firebaseService";
import { storeCommit } from "../store/storeCommit";
import { GROUP_COLLECTION, Group } from "./group";

export namespace groupService {
  export const crud = firebaseService.buildCrud(GROUP_COLLECTION)

  export async function watchGroups() {
    await firebase({
      ...firebaseDefaults,
      action: 'onCollection',
      collection: GROUP_COLLECTION,
      data: {
        async onData(data: Group[]) {
          console.log(data);

          storeCommit({
            action: 'setGroups',
            payload: data
          })
        },
      }
    })
  }
}

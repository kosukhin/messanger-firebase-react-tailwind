import {Applier, BaseRepository} from "../base/BaseRepository";
import {Firebase} from "./Firebase";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";

export class FirebaseRepository extends BaseRepository {
  registerApplier(): Applier {
    initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
    });

    const db = getFirestore();

    return ['Firebase', async (model: Firebase) => {
      if (model.action === 'add') {
        await addDoc(
          collection(
            db,
            model.collection
          ),
          model.data
        );
        model = model.takeChanged({
          isDone: true
        })
      }

      return model;
    }]
  }
}

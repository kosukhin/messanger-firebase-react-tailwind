import {Applier, BaseRepository} from "../base/BaseRepository";
import {Firebase} from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from "firebase/firestore";
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
        const addResult = await addDoc(
          collection(
            db,
            model.collection
          ),
          model.data
        );
        model = model.takeChanged({
          isDone: true,
          result: addResult
        })
      }

      if (model.action === 'update') {
        const {_id, ...data} = model.data
        const result = doc(db, model.collection, _id);
        const updateResult = await setDoc(result, data);
        return model.takeChanged({
          isDone: true,
          result: updateResult
        })
      }

      if (model.action === 'remove') {
        const result = doc(db, model.collection, model.data.id);
        const deletionResult = await deleteDoc(result);
        return model.takeChanged({
          result: deletionResult
        })
      }

      if (model.action === 'get') {
        const result = doc(db, model.collection, model.data.id);
        const docSnap = await getDoc(result);
        console.log('is existed', docSnap.exists())
        return model.takeChanged({
          result: docSnap.data()
        })
      }

      if (model.action === 'list') {
        let q: any = collection(db, model.collection);
        if (model.data.where) {
          const wheres = model.data.where.map((whereCondition: any) => {
            const [field, comparator, value] = whereCondition
            return where(field, comparator, value)
          })
          q = query(q, ...wheres);
        }
        const querySnapshot = await getDocs(q);
        const result = await (new Promise((resolve, reject) => {
          const result: any[] = [];
          try {
            querySnapshot.forEach((doc) => {
              result.push({_id: doc.id, ...(doc.data as any)()});

              if (result.length === querySnapshot.docs.length) {
                resolve(result)
              }
            });
          } catch (e) {
            reject(e)
          }
        }))

        return model.takeChanged({
          result
        })
      }

      return model;
    }]
  }
}

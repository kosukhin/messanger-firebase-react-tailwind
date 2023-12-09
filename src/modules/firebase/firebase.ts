import {firebaseModel, FirebaseModel} from "./FirebaseModel";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where
} from "firebase/firestore";
import {initializeApp} from "firebase/app";

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});
const db = getFirestore();

export async function firebase(model: FirebaseModel) {
  if (model.action === 'add') {
    const addResult = await addDoc(
      collection(
        db,
        model.collection
      ),
      model.data
    );
    model = firebaseModel(model, {
      isDone: true,
      result: addResult
    })
  }

  if (model.action === 'update') {
    const {_id, ...data} = model.data
    const result = doc(db, model.collection, _id);
    const updateResult = await setDoc(result, data);
    return firebaseModel(model, {
      isDone: true,
      result: updateResult
    })
  }

  if (model.action === 'remove') {
    const result = doc(db, model.collection, model.data.id);
    const deletionResult = await deleteDoc(result);
    if (model.data.onDelete) {
      model.data.onDelete();
    }
    return firebaseModel(model, {
      result: deletionResult
    })
  }

  if (model.action === 'get') {
    const result = doc(db, model.collection, model.data.id);
    const docSnap = await getDoc(result);
    return firebaseModel(model, {
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
    const result = await getShapshotResults(querySnapshot as any)

    return firebaseModel(model, {
      result
    })
  }

  if (model.action === 'onCollection') {
    let q: any = collection(db, model.collection);
    onSnapshot(
      q,
      async (snapshot: any) => {           // ...
        const result = await getShapshotResults(snapshot)

        if (model.data.onData) {
          model.data.onData(result)
        }
      },
      (error) => {
        // ...
        if (model.data.onError) {
          model.data.onError(error)
        }
      });
  }

  if (model.action === 'onDocument') {

  }

  return model;
}

async function getShapshotResults(shapshot: any) {
  return await (new Promise((resolve, reject) => {
    const result: any[] = [];
    try {
      shapshot.forEach((doc: any) => {
        result.push({_id: doc.id, ...(doc.data as any)()});

        if (result.length === shapshot.docs.length) {
          resolve(result)
        }
      });
    } catch (e) {
      reject(e)
    }
  }))
}
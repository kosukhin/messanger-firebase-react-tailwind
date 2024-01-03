import { initializeApp } from "firebase/app";
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

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});
const db = getFirestore();

type FirebaseActions = 'add' | 'update' | 'remove' | 'get' | 'list' | 'onCollection' | 'onDocument'

export async function firebase<T extends any>(
  action: FirebaseActions,
  collectionName: string,
  inData?: any
): Promise<T> {
  let result = null

  if (action === 'add') {
    const addResult = await addDoc(
      collection(
        db,
        collectionName
      ),
      inData
    );
    result = addResult
  }

  if (action === 'update') {
    const {id, ...data} = inData
    const resultDoc = doc(db, collectionName, id);
    const updateResult = await setDoc(resultDoc, data);
    result = updateResult
  }

  if (action === 'remove') {
    const resultDoc = doc(db, collectionName, inData.id);
    const deletionResult = await deleteDoc(resultDoc);
    if (inData.onDelete) {
      inData.onDelete();
    }
    result = deletionResult
  }

  if (action === 'get') {
    const resultDoc = doc(db, collectionName, inData.id);
    const docSnap = await getDoc(resultDoc);
    result = docSnap.data()
  }

  if (action === 'list') {
    let q: any = collection(db, collectionName);
    if (inData.where) {
      const wheres = inData.where.map((whereCondition: any) => {
        const [field, comparator, value] = whereCondition
        return where(field, comparator, value)
      })
      q = query(q, ...wheres);
    }
    const querySnapshot = await getDocs(q);
    const resultDoc = await getShapshotResults(querySnapshot as any)

    result = resultDoc
  }

  if (action === 'onCollection') {
    let q: any = collection(db, collectionName);
    onSnapshot(
      q,
      async (snapshot: any) => {
        const result = await getShapshotResults(snapshot)

        if (inData.onData) {
          inData.onData(result)
        }
      },
      (error) => {
        if (inData.onError) {
          inData.onError(error)
        }
      });
  }

  return result as T;
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

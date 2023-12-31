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

export class Firebase {
  constructor(
    public action: FirebaseActions,
    public collection: string,
    public data?: any
  ) {}
}

export async function firebase<T extends any>(
  ...props: ConstructorParameters<typeof Firebase>
): Promise<T> {
  const model = new Firebase(...props);
  let result = null

  if (model.action === 'add') {
    const addResult = await addDoc(
      collection(
        db,
        model.collection
      ),
      model.data
    );
    result = addResult
  }

  if (model.action === 'update') {
    const {id, ...data} = model.data
    const resultDoc = doc(db, model.collection, id);
    const updateResult = await setDoc(resultDoc, data);
    result = updateResult
  }

  if (model.action === 'remove') {
    const resultDoc = doc(db, model.collection, model.data.id);
    const deletionResult = await deleteDoc(resultDoc);
    if (model.data.onDelete) {
      model.data.onDelete();
    }
    result = deletionResult
  }

  if (model.action === 'get') {
    const resultDoc = doc(db, model.collection, model.data.id);
    const docSnap = await getDoc(resultDoc);
    result = docSnap.data()
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
    const resultDoc = await getShapshotResults(querySnapshot as any)

    result = resultDoc
  }

  if (model.action === 'onCollection') {
    let q: any = collection(db, model.collection);
    onSnapshot(
      q,
      async (snapshot: any) => {
        const result = await getShapshotResults(snapshot)

        if (model.data.onData) {
          model.data.onData(result)
        }
      },
      (error) => {
        if (model.data.onError) {
          model.data.onError(error)
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

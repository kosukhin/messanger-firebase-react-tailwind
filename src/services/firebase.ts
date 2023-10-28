import {operation} from "../lib/operation";
import {firebase} from "../models/firebase";
import {initializeApp} from "firebase/app";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import registerApplier = operation.registerApplier;
import Firebase = firebase.models.Firebase;

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

const db = getFirestore();


registerApplier('Firebase', async (model: Firebase) => {
  console.log(model)
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
})

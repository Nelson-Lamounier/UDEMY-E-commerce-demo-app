import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, getDocs, setDoc, collection, writeBatch, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLUMoLVOLsAoZn5T3o-4Rv66mXvQV44JU",
  authDomain: "test-react-app-59dae.firebaseapp.com",
  projectId: "test-react-app-59dae",
  storageBucket: "test-react-app-59dae.appspot.com",
  messagingSenderId: "1046718538218",
  appId: "1:1046718538218:web:e11e115f5f48c49a585293",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Create the database on firebase
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  })

  await batch.commit();
  console.log("done")
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  // fetch the data
  const userSnapshot = await getDoc(userDocRef);

  // evaluate if the user data exist if not exist firebase set the database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

//Helper Functions

// Async funtion because we will be storing data to firebase asyncronisly
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// The below function will be invoke each time a user auth in(login) and when use auth out(logout)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// The above function represent the Observer Pattern concept as follows:
/**
 * next: callback,
 * error: errorCallback
 * Complete: completedCallback
 */

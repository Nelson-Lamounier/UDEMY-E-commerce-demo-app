import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLUMoLVOLsAoZn5T3o-4Rv66mXvQV44JU",
  authDomain: "test-react-app-59dae.firebaseapp.com",
  projectId: "test-react-app-59dae",
  storageBucket: "test-react-app-59dae.appspot.com",
  messagingSenderId: "1046718538218",
  appId: "1:1046718538218:web:e11e115f5f48c49a585293"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider)

// Create the database on firebase
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  // fetch the data
  const userSnapshot = await getDoc(userDocRef);

  // evaluate if the user data exist if not exist firebase set the database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

// Async funtion because we will be storing data to firebase asyncronisly
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

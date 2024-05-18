import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create the database on firebase
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

import { put, all, call, takeLatest } from "typed-redux-saga/macro";
import { PayloadAction } from "@reduxjs/toolkit";

import { User } from "firebase/auth";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  googleSignInStart,
  checkUserSession,
  emailSignInStart,
  signUpStart,
  signOutStart,
} from "./user.slice";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation ) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if(userSnapshot) {

      yield* put(
        signInSuccess({
          uid: userSnapshot.id,
          ...userSnapshot.data(),
          createdAt: null,
        })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password } }: PayloadAction<{ email: string; password: string }>)  {
  try {
    const UserCredential  = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if(UserCredential) {
      const { user } = UserCredential;
      yield* call(getSnapshotFromUserAuth, user)
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } } :PayloadAction<{
  email: string;
  password: string;
  displayName: string;
}>) {
  try {
    const UserCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(UserCredential) {
      const { user } = UserCredential; 
      yield* put(signUpSuccess({user, additionalDetails: {displayName} }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

// yield* put(signUpSuccess({user: {...user, displayName: user.displayName ?? "Anonymous"}, additionalDetails: {displayName}}));

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } } : PayloadAction<{
  user: User;
  additionalDetails: Record<string, any>;
}>) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart.type, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(checkUserSession.type, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart.type, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(signUpStart.type, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(signUpSuccess.type, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(signOutStart.type, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

import { createSlice } from "@reduxjs/toolkit";
// import { setCurrentUser } from "./user.action";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    checkUserSession(state) {
      // No changes needed in the state here, but you may trigger a side effect in middleware
    },
    googleSignInStart(state, action) {
      // No direct state change, might be used in middleware
    },
    emailSignInStart(state, action) {
      // No direct state change, but passing payload (email, password)
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.error = null; // Clear any previous errors
    },
    signInFailed(state, action) {
      state.error = action.payload; // This should receive { message, name }
    },
    signUpStart(state, action) {
      // No direct state change, but passing payload (email, password, displayName)
    },
    signUpSuccess(state, action) {
      const { user, additionalDetails } = action.payload
      state.currentUser = { ...user, ...additionalDetails };
      state.error = null;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutStart(state) {
      // No direct state change, but could be used in middleware
    },
    signOutSuccess(state) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer
export const {
  setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return {
//         ...state,
//         currentUser: null,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return {
//         ...state,
//         error: payload,
//       };
//     default:
//       return state;
//   }
// };

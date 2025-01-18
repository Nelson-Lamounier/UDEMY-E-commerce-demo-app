import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isActionOf } from "../../utils/matchers/action.matchers.utils";


// Define the structure of the user object
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  [key: string]: any; // Additional optional properties
}

// Define the initial state structure
export interface UserState {
  currentUser: User | null;
  additionalDetails: Record<string, any> | null; 
  isLoading: boolean;
  error: string | null;
}


const INITIAL_STATE: UserState = {
  currentUser: null,
  additionalDetails: null, 
  isLoading: false,
  error: null,
};

// // Utility to make an action matchable
// export const isActionOf = <T extends (...args: any) => any>(
//   creator: T,
//   action: any
// ): action is ReturnType<T> => action.type === creator().type;

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    checkUserSession(state) {
      // No changes needed in the state here, but you may trigger a side effect in middleware
    },
    googleSignInStart(state, action: PayloadAction<undefined>) {
      // No direct state change, might be used in middleware
    },
    emailSignInStart(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      // No direct state change, but passing payload (email, password)
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.error = null; // Clear any previous errors
    },
    signInFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload.message; // This should receive { message, name }
    },
    signUpStart(
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        displayName: string;
      }>
    ) {
      // No direct state change, but passing payload (email, password, displayName)
    },
    signUpSuccess(
      state,
      action: PayloadAction<{
        user: User;
        additionalDetails: Record<string, any>;
      }>
    ) {
      const { user, additionalDetails } = action.payload;
      state.currentUser = { ...user, ...additionalDetails};
      state.error = null;
    },
    signUpFailed(state, action: PayloadAction<Error>) {
   
    },
    signOutStart(state) {
      // No direct state change, but could be used in middleware
    },
    signOutSuccess(state) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(state, action: PayloadAction<Error>) {
     
    },
  },
  extraReducers: (builder) => {
    // Dynamic matching for actions
    builder.addMatcher(isActionOf(checkUserSession), (state) => {
      state.isLoading = true;
      state.error = null;
    }).addMatcher(isActionOf(signInSuccess), (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    }).addMatcher(isActionOf(signInFailed), (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    }).addMatcher(isActionOf(signOutSuccess), (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    }).addMatcher(isActionOf(signOutFailed), (state, action) => {
      state.isLoading = false;
      
    }).addMatcher(isActionOf(signUpSuccess), (state, action) => {
      const { user, additionalDetails} = action.payload;
      state.isLoading = false;
      state.error = null;
    }).addMatcher(isActionOf(signUpFailed), (state, action) => {
      state.isLoading = false;
     
    })
  }
});

// extraReducers: (builder) => {
//   // Dynamic matching for actions
//   builder.addMatcher(
//     (action): action is ReturnType<typeof fetchCategoriesStart> =>
//       isActionOf(categoriesSlice.actions.fetchCategoriesStart, action), (state) => {
//         state.isLoading = true;
//         state.error = null;
//       }
//   )

//       .addMatcher(
//         (action: Action): action is PayloadAction<User> =>
//           action.type.endsWith("/Success") && action.payload?.id,
//         (state, action) => {
//           state.currentUser = action.payload;
//           state.isLoading = false;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         (action: Action): action is PayloadAction<string> =>
//           action.type.endsWith("/Failed"),
//         (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// extraReducers: (builder) => {
//   // Dynamic matching for actions
//   builder.addMatcher(
//     (action): action is ReturnType<typeof fetchCategoriesStart> =>
//       isActionOf(categoriesSlice.actions.fetchCategoriesStart, action), (state) => {
//         state.isLoading = true;
//         state.error = null;
//       }
//   )
//   .addMatcher(
//     (action): action is ReturnType<typeof fetchCategoriesSuccess> =>
//       isActionOf(categoriesSlice.actions.fetchCategoriesSuccess, action), (state, action) => {
//         state.categories = action.payload;
//         state.isLoading = false;
//         state.error = null;
//       }
//   )
//   .addMatcher(
//     (action): action is ReturnType<typeof fetchCategoriesFailed> =>
//       isActionOf(categoriesSlice.actions.fetchCategoriesFailed, action), (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload
//       }
//   )

// },

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

import { createSlice } from "@reduxjs/toolkit";


export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    // Action to start fetching categories
    fetchCategoriesStart(state) {
      state.isLoading = true;
      state.error = null; //Clear any previous error
    },
    // Action to handle successful fetch
    fetchCategoriesSuccess(state, action) {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // Action to handle failed fetch
    fetchCategoriesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

// export const categoriesReducer = (
//   state = CATEGORIES_INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return {...state, isLoading: true}
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return { ...state, categories: payload, isLoading: false };
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//       return { ...state, error: payload, isLoading: false };
//     default:
//       return state;
//   }
// };

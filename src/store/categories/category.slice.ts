import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isActionOf } from "../../utils/matchers/action.matchers.utils";

// replace any with the Category Type:
export interface CategoryItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface Category {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
}

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

// Define the shape of the state
export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

// Inital state with the defined type
export const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};
// // Utility to make an action matchable
// export const isActionOf = <T extends (...args: any) => any>(
//   creator: T,
//   action: any
// ): action is ReturnType<T> => action.type === creator().type;

// Define the slice
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    // Action to start fetching categories
    fetchCategoriesStart(state) {
      state.isLoading = true;
      state.error = null; //Clear any previous error
    },
    // Action to handle successful fetch
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // Action to handle failed fetch
    fetchCategoriesFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Dynamic matching for actions
    builder.addMatcher(
        isActionOf(fetchCategoriesStart), (state) => {
          state.isLoading = true;
          state.error = null;
        }
    )
    .addMatcher(
        isActionOf(fetchCategoriesSuccess), (state, action) => {
          state.categories = action.payload;
          state.isLoading = false;
          state.error = null;
        }
    )
    .addMatcher(
        isActionOf(fetchCategoriesFailed), (state, action) => {
          state.isLoading = false;
          state.error = action.payload
        }
    )
    
  },
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

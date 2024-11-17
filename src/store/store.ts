import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

// Define the shape of the persisted state
interface PersistedStore {
  cart: any; // Replace `any` with the type of your `cart` state if known
}

// Configure persist settings with type safety
type ExtendedPersistConfig = PersistConfig<ReturnType<typeof rootReducer>> & {
  whitelist: (keyof PersistedStore)[];
}

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// Create the persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure middleware
const middleWares: Middleware[] = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean) as Middleware[];

// Create the store using configureStore
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable checks
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(middleWares),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

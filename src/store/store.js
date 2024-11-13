import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// Create the persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure middleware
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);

// Create the store using configureStore
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable checks
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(middleWares),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

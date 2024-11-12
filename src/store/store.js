// import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

// // import { thunk } from 'redux-thunk';

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

// // const loggerMiddleware = (store) => (next) => (action) => {
// //     if(!action.type) {
// //         return  next(action)
// //     }

// //     console.log('type: ', action.type)
// //     console.log('payload: ', action.payload)
// //     console.log('currentState : ', store.getState())

// //     next(action);

// //     console.log('next state: ', store.getState())
// // }

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);

const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const middleWares = [loggerMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// // const composedEnhancers = compose(applyMiddleware(...middleWares))

// export const store = configureStore({reducer: {user: rootReducer}})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

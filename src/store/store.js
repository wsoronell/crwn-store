import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from "./root-reducer";
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    thunk
].filter(Boolean);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: middleWares
});

export const persistor = persistStore(store);
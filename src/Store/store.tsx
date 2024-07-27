import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import Reducer, { RootState } from './Reducer';
import { authApi } from './services';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    'authReducer'
  ]
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }).concat(authApi.middleware)
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootStates = ReturnType<typeof store.getState>

export { store, persistor };
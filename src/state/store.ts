import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AuthAPI } from 'services/Auth';

const rootReducer = combineReducers({
  [AuthAPI.reducerPath]: AuthAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthAPI.middleware),
  });
};

export default setupStore;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

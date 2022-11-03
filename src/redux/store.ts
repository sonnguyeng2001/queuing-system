import { roleSlice } from './features/RoleSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { deviceSlice } from './features/DeviceSlice';
import { customerServiceSlice } from './features/CustomerServicesSlice';
import { userSlice } from './features/UserSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
      key: 'root',
      storage,
};
// -------------------------------------------------------------------
const rootReducers = combineReducers({
      user: userSlice.reducer,
      device: deviceSlice.reducer,
      service: customerServiceSlice.reducer,
      role: roleSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export type State = ReturnType<typeof rootReducers>;

// export const store = createStore(reducers, {}, applyMiddleware(thunk));
export const store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
});

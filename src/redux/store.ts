import { roleSlice } from './features/RoleSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { deviceSlice } from './features/DeviceSlice';
import { customerServiceSlice } from './features/CustomerServicesSlice';
import { actionHistorySlice } from './features/ActionHistorySlice';
import { userSlice } from './features/UserSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { useDispatch } from 'react-redux';
import { serviceSlice } from './features/ServiceSlice';

const persistConfig = {
      key: 'root',
      storage,
};
// -------------------------------------------------------------------
const rootReducers = combineReducers({
      user: userSlice.reducer,
      device: deviceSlice.reducer,
      customerService: customerServiceSlice.reducer,
      role: roleSlice.reducer,
      service: serviceSlice.reducer,
      actionHistory: actionHistorySlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

// export const store = createStore(reducers, {}, applyMiddleware(thunk));
export const store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
});

export type State = ReturnType<typeof rootReducers>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

import { roleSlice } from './features/RoleSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { deviceSlice } from './features/DeviceSlice';
import { customerServiceSlice } from './features/CustomerServicesSlice';
import { userSlice } from './features/UserSlice';

// -------------------------------------------------------------------
const rootReducers = combineReducers({
   user: userSlice.reducer,
   device: deviceSlice.reducer,
   service: customerServiceSlice.reducer,
   role: roleSlice.reducer,
});

export type State = ReturnType<typeof rootReducers>;

// export const store = createStore(reducers, {}, applyMiddleware(thunk));
export const store = configureStore({ reducer: rootReducers });

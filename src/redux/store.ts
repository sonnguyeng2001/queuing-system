import { combineReducers } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userSlice } from './features/UserSlice';


// -------------------------------------------------------------------
const reducers = combineReducers({
   user: userSlice.reducer,
});

export type State = ReturnType<typeof reducers>;

export const store = createStore(reducers, {}, applyMiddleware(thunk));

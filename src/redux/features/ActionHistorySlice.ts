import uuid from 'react-uuid';
import { State } from './../store';
import { ActionHistoryType } from './../../components/propsType/ActionHistoryProps';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, child, get, set } from 'firebase/database';
import { database } from '../../firebase/index';
import { useSelector } from 'react-redux';
import { StringifyOptions } from 'querystring';

export const getActionHistory = createAsyncThunk('actionHistory/getActionHistory', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `actionHistory`)).then((snapshot) => snapshot.val());
      } catch (error) {
            console.log(error);
            rejectWithValue(error);
      }
});

export const addActionHistory = createAsyncThunk(
      'actionHistory/addActionHistory',
      async ({ description, keyUser }: { description: string; keyUser: string }) => {
            try {
                  const ipAddress = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(
                        Math.random() * 255,
                  )}.${Math.floor(Math.random() * 255)}`;
                  const keyAction = uuid().slice(0, 8).toUpperCase();
                  const obj = {
                        desc: description,
                        idUsername: keyUser,
                        ip: ipAddress,
                        key: keyAction,
                        timeStart: new Date().getTime().valueOf(),
                  };
                  await set(ref(database, `actionHistory/${keyAction}`), obj);
                  return obj;
            } catch (error) {
                  console.log(error);
            }
      },
);

interface ActionHistoryProps {
      data: ActionHistoryType[];
      isSuccess: boolean;
      message: string;
}
export const actionHistorySlice = createSlice({
      name: ' actionHistory',
      initialState: {
            data: [],
            isSuccess: false,
            message: '',
      } as ActionHistoryProps,
      reducers: {},
      extraReducers: {
            // ------------------------- getActionHistory
            [getActionHistory.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Load data Action History successfully';
                  state.data = Object.values(action.payload);
                  state.data.reverse();
            },

            // ------------------------- addActionHistory
            [addActionHistory.fulfilled.toString()]: (state, action: PayloadAction<ActionHistoryType>) => {
                  state.isSuccess = true;
                  state.message = 'Load data Action History successfully';
                  state.data = [action.payload, ...state.data];
            },
      },
});

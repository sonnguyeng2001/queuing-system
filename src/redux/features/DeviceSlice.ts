import { DevicesType } from '../../components/propsType/DevicesProps';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ref, child, get } from 'firebase/database';
import { database } from '../../firebase/index';

export const getDevices = createAsyncThunk('devices/getDevices', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `devices`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

interface DevicesProps {
      dataDevices: DevicesType[];
      isSuccess: boolean;
      message: string;
}
export const deviceSlice = createSlice({
      name: 'device',
      initialState: {
            dataDevices: [],
            isSuccess: false,
            message: '',
      } as DevicesProps,
      reducers: {},
      extraReducers: {
            // ------------------------- getDevices
            [getDevices.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Load data devices successfully';
                  state.dataDevices = action.payload;
            },

            [getDevices.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },
      },
});

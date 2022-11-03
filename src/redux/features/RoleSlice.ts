import { RoleType } from './../../component/propsType/RoleProps';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ref, child, get } from 'firebase/database';
import { database } from '../../firebase/index';
export const getRoles = createAsyncThunk('roles/getRoles', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `roles`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

interface RoleProps {
      data: RoleType[];
      isSuccess: boolean;
      message: string;
}
export const roleSlice = createSlice({
      name: 'role',
      initialState: {
            data: [],
            isSuccess: false,
            message: '',
      } as RoleProps,
      reducers: {},
      extraReducers: {
            // ------------------------- getRoles
            [getRoles.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Load data roles successfully';
                  state.data = action.payload;
            },
            [getRoles.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },
      },
});

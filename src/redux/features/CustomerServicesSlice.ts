import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ref, child, get } from 'firebase/database';
import { database } from '../../firebase/index';
import { CustomerServiceType } from '../../component/propsType/CustomerServiceProps';

export const getCustomerServices = createAsyncThunk(
   'customerService/getCustomerServices',
   (arg, { rejectWithValue }) => {
      try {
         const dbRef = ref(database);
         return get(child(dbRef, `services`)).then((snapshot) => snapshot.val());
      } catch (error) {
         rejectWithValue(error);
      }
   },
);

interface CustomerServiceProps {
   dataCustomerServices: CustomerServiceType[];
   isSuccess: boolean;
   message: string;
}
export const customerServiceSlice = createSlice({
   name: 'customerService',
   initialState: {
      dataCustomerServices: [],
      isSuccess: false,
      message: '',
   } as CustomerServiceProps,
   reducers: {},
   extraReducers: {
      // ------------------------- getDevices
      [getCustomerServices.fulfilled.toString()]: (state, action) => {
         state.isSuccess = true;
         state.message = 'Load data customerServices successfully';
         state.dataCustomerServices = action.payload;
      },

      [getCustomerServices.rejected.toString()]: (state, action) => {
         state.message = action.payload;
         state.isSuccess = false;
      },
   },
});

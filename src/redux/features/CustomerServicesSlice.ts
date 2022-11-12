import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ref, child, get } from 'firebase/database';
import { database } from '../../firebase/index';
import { CustomerServiceType } from '../../components/propsType/CustomerServiceProps';

export const getCustomerServices = createAsyncThunk('customerService/getCustomerServices', (_, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `customerServices`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

export const addCustomerService = createAsyncThunk(
      'customerService/addCustomerServices',
      async (data: CustomerServiceType) => {
            try {
                  console.log(data);
            } catch (error) {
                  return error;
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
            // ------------------------- getCustomerServices
            [getCustomerServices.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Load data customerServices successfully';
                  state.dataCustomerServices = Object.values(action.payload);
            },

            [getCustomerServices.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },
      },
});

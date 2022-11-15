import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { ref, child, get, set } from 'firebase/database';
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
                  await set(ref(database, `customerServices/${data.key}`), {
                        customerName: data.customerName,
                        email: data.email,
                        key: data.key,
                        origin: data.origin,
                        ordinalNumber: data.ordinalNumber,
                        phone: data.phone,
                        serviceValue: data.serviceValue,
                        status: data.status,
                        timeEnd: data.timeEnd,
                        timeStart: data.timeStart,
                  });
                  return data;
            } catch (error) {
                  console.log(error);
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

            // ------------------------- addCustomerService
            [addCustomerService.fulfilled.toString()]: (state, action: PayloadAction<CustomerServiceType>) => {
                  state.isSuccess = true;
                  state.message = 'Add data customerServices successfully';
                  state.dataCustomerServices = [...state.dataCustomerServices, action.payload];
            },
            [addCustomerService.rejected.toString()]: (state, action) => {
                  state.message = 'Add data customerServices Failed';
                  state.isSuccess = false;
            },
      },
});

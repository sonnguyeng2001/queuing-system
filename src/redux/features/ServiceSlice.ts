import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ref, child, get, set } from 'firebase/database';
import { database } from '../../firebase/index';
import { ServiceType } from '../../components/propsType/ServiceProps';

export const getServices = createAsyncThunk('services/getServices', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `services`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

export const addService = createAsyncThunk('services/addService', async (service: ServiceType) => {
      try {
            await set(ref(database, `services/${service.key}`), {
                  desc: service.desc,
                  isActive: service.isActive,
                  key: service.key,
                  name: service.name,
            });
            return service;
      } catch (error) {
            return error;
      }
});

interface ServiceProps {
      dataServices: ServiceType[];
      isSuccess: boolean;
      message: string;
}
export const serviceSlice = createSlice({
      name: ' service',
      initialState: {
            dataServices: [],
            isSuccess: false,
            message: '',
      } as ServiceProps,
      reducers: {},
      extraReducers: {
            // ------------------------- getServices
            [getServices.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Load data service successfully';
                  state.dataServices = Object.values(action.payload);
            },

            // ------------------------- addService
            [addService.fulfilled.toString()]: (state, action) => {
                  state.dataServices = [...state.dataServices, action.payload];
            },
      },
});

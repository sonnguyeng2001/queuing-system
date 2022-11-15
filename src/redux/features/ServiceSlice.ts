import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { ref, child, get, set, update } from 'firebase/database';
import { database } from '../../firebase/index';
import { ServiceType } from '../../components/propsType/ServiceProps';

export const getServices = createAsyncThunk('services/getServices', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `services`)).then((snapshot) => snapshot.val());
      } catch (error) {
            console.log(error);
            rejectWithValue(error);
      }
});

export const addService = createAsyncThunk('services/addService', async (service: ServiceType) => {
      try {
            await set(ref(database, `services/${service.key}`), {
                  desc: service.desc,
                  isActive: service.isActive,
                  key: service.key,
                  id: service.id,
                  listOption: service.listOption,
                  name: service.name,
            });
            return service;
      } catch (error) {
            console.log(error);
      }
});

export const updateService = createAsyncThunk('services/updateService', async (service: ServiceType) => {
      try {
            await update(ref(database, `services/${service.key}`), {
                  desc: service.desc,
                  isActive: service.isActive,
                  id: service.id,
                  listOption: service.listOption,
                  name: service.name,
            });
            return service;
      } catch (error) {
            console.log(error);
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
            [addService.fulfilled.toString()]: (state, action: PayloadAction<ServiceType>) => {
                  state.isSuccess = true;
                  state.message = 'Add service successfully';
                  state.dataServices = [...state.dataServices, action.payload];
            },

            // ------------------------- updateService
            [updateService.fulfilled.toString()]: (state, action: PayloadAction<ServiceType>) => {
                  state.isSuccess = true;
                  state.message = 'Update data service successfully';
                  const index = state.dataServices.findIndex((service) => service.key === action.payload.key);
                  state.dataServices[index] = action.payload;
            },
      },
});

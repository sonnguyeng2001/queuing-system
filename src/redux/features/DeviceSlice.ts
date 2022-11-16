import { DevicesType } from '../../components/propsType/DevicesProps';
import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';

import { ref, child, get, update, set } from 'firebase/database';
import { database } from '../../firebase/index';

export const getDevices = createAsyncThunk('devices/getDevices', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `devices`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

export const updateDevice = createAsyncThunk('devices/UpdateDevice', async (device: DevicesType) => {
      try {
            await update(ref(database, `devices/${device.key}`), {
                  id: device.id,
                  ipAddress: device.ipAddress,
                  isActive: device.isActive,
                  isConnected: device.isConnected,
                  name: device.name,
                  used: device.used,
                  userName: device.userName,
                  password: device.password,
                  category: device.category,
            });
            return device;
      } catch (error) {
            console.log(error);
      }
});

export const addDevice = createAsyncThunk('devices/addDevice', async (device: DevicesType) => {
      try {
            await set(ref(database, `devices/${device.key}`), {
                  key: device.key,
                  id: device.id,
                  ipAddress: device.ipAddress,
                  isActive: device.isActive,
                  isConnected: device.isConnected,
                  name: device.name,
                  used: device.used,
                  userName: device.userName,
                  password: device.password,
                  category: device.category,
            });
            return device;
      } catch (error) {
            console.log(error);
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
                  state.dataDevices = Object.values(action.payload);
            },
            [getDevices.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },

            // ------------------------- updateDevice
            [updateDevice.fulfilled.toString()]: (state, action: PayloadAction<DevicesType>) => {
                  state.isSuccess = true;
                  state.message = 'Update Device Successfully';
                  const index = state.dataDevices.findIndex((device) => device.key === action.payload.key);
                  state.dataDevices[index] = action.payload;
            },
            [updateDevice.rejected.toString()]: (state) => {
                  state.isSuccess = false;
                  state.message = 'Update Device Failed';
            },

            // ------------------------- addDevice
            [addDevice.fulfilled.toString()]: (state, action: PayloadAction<DevicesType>) => {
                  state.isSuccess = true;
                  state.message = 'Add Device Successfully';
                  state.dataDevices = [...state.dataDevices, action.payload];
            },
            [addDevice.rejected.toString()]: (state) => {
                  state.isSuccess = false;
                  state.message = 'Add Device Failed';
            },
      },
});

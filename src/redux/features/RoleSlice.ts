import { RoleType } from '../../components/propsType/RoleProps';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { ref, child, get, set, update } from 'firebase/database';
import { database } from '../../firebase/index';
export const getRoles = createAsyncThunk('roles/getRoles', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `roles`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

export const addRole = createAsyncThunk('roles/addRole', async (role: RoleType) => {
      try {
            await set(ref(database, `roles/${role.key}`), {
                  key: role.key,
                  roleName: role.roleName,
                  roleUserCount: 0,
                  roleDescription: role.roleDescription,
                  roleTaskA: role.roleTaskA,
                  roleTaskB: role.roleTaskB,
                  roleTaskC: role.roleTaskC,
            });
            return role;
      } catch (error) {
            return error;
      }
});

export const updateRole = createAsyncThunk('roles/updateRole', async (role: RoleType) => {
      try {
            await update(ref(database, `roles/${role.key}`), {
                  roleName: role.roleName,
                  roleDescription: role.roleDescription,
                  roleTaskA: role.roleTaskA,
                  roleTaskB: role.roleTaskB,
                  roleTaskC: role.roleTaskC,
            });
            return role;
      } catch (error) {
            return error;
      }
});

export const updateRoleQuantity = createAsyncThunk('roles/updateRoleQuantity', async (role: RoleType) => {
      try {
            await update(ref(database, `roles/${role.key}`), {
                  roleUserCount: role.roleUserCount + 1,
            });
            return role;
      } catch (error) {
            return error;
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
                  state.data = Object.values(action.payload);
            },
            [getRoles.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },

            // ------------------------- addRole
            [addRole.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Add roles successfully';
                  state.data = [...state.data, action.payload];
            },
            [addRole.rejected.toString()]: (state, action) => {
                  console.log(action.payload);
            },

            // ------------------------- updateRole
            [updateRole.fulfilled.toString()]: (state, action: PayloadAction<RoleType>) => {
                  state.isSuccess = true;
                  state.message = 'Update roles successfully';
                  const index = state.data.findIndex((role) => role.key === action.payload.key);
                  state.data[index] = action.payload;
            },
            [updateRole.rejected.toString()]: (state, action) => {
                  console.log(action.payload);
            },

            // ------------------------- updateRoleQuantity
            [updateRoleQuantity.fulfilled.toString()]: (state, action: PayloadAction<RoleType>) => {
                  state.isSuccess = true;
                  state.message = 'Update roles quantity successfully';
                  const index = state.data.findIndex((role) => role.key === action.payload.key);
                  state.data[index].roleUserCount += 1;
            },
            [updateRoleQuantity.rejected.toString()]: (state, action) => {
                  console.log(action.payload);
            },
      },
});

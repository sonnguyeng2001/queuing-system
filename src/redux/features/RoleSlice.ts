import { RoleType } from '../../components/propsType/RoleProps';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, child, get, set, update } from 'firebase/database';
import { database } from '../../firebase/index';

type UpdateRoleQuantityType = {
      arrayRole: RoleType[];
      type: 'addition' | 'subtraction' | 'additionAndSubtraction';
};
export const getRoles = createAsyncThunk('roles/getRoles', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `roles`)).then((snapshot) => snapshot.val());
      } catch (error) {
            console.log(error);
            rejectWithValue(error);
      }
});

export const addRole = createAsyncThunk('roles/addRole', async (role: RoleType) => {
      try {
            await set(ref(database, `roles/${role.key}`), {
                  key: role.key,
                  roleName: role.roleName,
                  roleUserCount: role.roleUserCount,
                  roleDescription: role.roleDescription,
                  roleTaskA: role.roleTaskA || [],
                  roleTaskB: role.roleTaskB || [],
                  roleTaskC: role.roleTaskC || [],
            });
            return role;
      } catch (error) {
            console.log(error);
            return error;
      }
});

export const updateRole = createAsyncThunk('roles/updateRole', async (role: RoleType) => {
      try {
            await update(ref(database, `roles/${role.key}`), {
                  roleName: role.roleName,
                  roleDescription: role.roleDescription,
                  roleTaskA: role.roleTaskA || [],
                  roleTaskB: role.roleTaskB || [],
                  roleTaskC: role.roleTaskC || [],
            });
            return role;
      } catch (error) {
            console.log(error);
            return error;
      }
});

export const updateRoleQuantity = createAsyncThunk(
      'roles/updateRoleQuantity',
      async ({ arrayRole, type }: UpdateRoleQuantityType) => {
            try {
                  if (type === 'addition') {
                        const role = arrayRole[0];
                        await update(ref(database, `roles/${role.key}`), {
                              roleUserCount: role.roleUserCount + 1,
                        });
                        return { arrayRole, type };
                  }

                  if (type === 'subtraction') {
                        const role = arrayRole[0];
                        await update(ref(database, `roles/${role.key}`), {
                              roleUserCount: role.roleUserCount - 1,
                        });
                        return { arrayRole, type };
                  }

                  if (type === 'additionAndSubtraction') {
                        const additionQuantityRole = arrayRole[0];
                        const subtractionQuantityRole = arrayRole[1];

                        await update(ref(database, `roles/${additionQuantityRole.key}`), {
                              roleUserCount: additionQuantityRole.roleUserCount + 1,
                        });
                        await update(ref(database, `roles/${subtractionQuantityRole.key}`), {
                              roleUserCount: subtractionQuantityRole.roleUserCount - 1,
                        });
                        return { arrayRole, type };
                  }
            } catch (error) {
                  console.log(error);
                  return error;
            }
      },
);

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
                  state.data.reverse();
            },
            [getRoles.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },

            // ------------------------- addRole
            [addRole.fulfilled.toString()]: (state, action: PayloadAction<RoleType>) => {
                  state.isSuccess = true;
                  state.message = 'Add roles successfully';
                  state.data = [action.payload, ...state.data];
            },
            [addRole.rejected.toString()]: (state, action) => {},

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
            [updateRoleQuantity.fulfilled.toString()]: (state, action: PayloadAction<UpdateRoleQuantityType>) => {
                  state.isSuccess = true;
                  state.message = 'Update roles quantity successfully';
                  if (action.payload.type === 'addition') {
                        const rolePayload = action.payload.arrayRole[0];
                        const index = state.data.findIndex((role) => role.key === rolePayload.key);
                        state.data[index].roleUserCount += 1;
                        return;
                  }

                  if (action.payload.type === 'subtraction') {
                        const rolePayload = action.payload.arrayRole[0];
                        const index = state.data.findIndex((role) => role.key === rolePayload.key);
                        state.data[index].roleUserCount -= 1;
                        return;
                  }

                  if (action.payload.type === 'additionAndSubtraction') {
                        const additionQuantityRole = action.payload.arrayRole[0];
                        const subtractionQuantityRole = action.payload.arrayRole[1];

                        const indexAddition = state.data.findIndex((role) => role.key === additionQuantityRole.key);
                        state.data[indexAddition].roleUserCount += 1;

                        const indexSubtraction = state.data.findIndex(
                              (role) => role.key === subtractionQuantityRole.key,
                        );
                        state.data[indexSubtraction].roleUserCount -= 1;
                        return;
                  }
            },
            [updateRoleQuantity.rejected.toString()]: (state, action) => {
                  console.log(action.payload);
            },
      },
});

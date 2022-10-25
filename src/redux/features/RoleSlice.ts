import { RoleProps } from './../../component/propsType/RoleProps';
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

// export const updatePassword = createAsyncThunk(
//    'users/updatePassword',
//    async ({ email, password, username, fullName }: UserProps) => {
//       try {
//          const id = uid();
//          set(ref(database, `users/${id}`), {
//             id: id,
//             email: email,
//             password: password,
//             username: username,
//             fullName: fullName,
//          });
//          return { email, password, id };
//       } catch (error) {
//          console.log(error);
//       }
//    },
// );

interface RoleType {
   data: RoleProps[];
   isSuccess: boolean;

   message: string;
}
export const roleSlice = createSlice({
   name: 'user',
   initialState: {
      data: [],
      isSuccess: false,
      message: '',
   } as RoleType,
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

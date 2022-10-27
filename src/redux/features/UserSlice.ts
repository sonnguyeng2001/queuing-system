import { UserType } from '../../component/propsType/UserProps';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ref, child, get, update } from 'firebase/database';
import { database } from '../../firebase/index';
export const getUsers = createAsyncThunk('users/getUsers', (arg, { rejectWithValue }) => {
      try {
            const dbRef = ref(database);
            return get(child(dbRef, `users`)).then((snapshot) => snapshot.val());
      } catch (error) {
            rejectWithValue(error);
      }
});

export const updatePassword = createAsyncThunk('users/updatePassword', async ({ email, password, key }: UserType) => {
      try {
            await update(ref(database, `users/${key}`), {
                  key: key,
                  email: email,
                  password: password,
            });
            return { email, password, key };
      } catch (error) {
            console.log(error);
      }
});

export const userLogin = createAsyncThunk('users/userLogin', (user: UserType, { rejectWithValue }) => {
      try {
            return user;
      } catch (error) {
            rejectWithValue(error);
      }
});

export const userLogout = createAsyncThunk('users/userLogout', (state: boolean, { rejectWithValue }) => {
      try {
            return state;
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

interface UserProps {
      data: UserType[];
      currentUser: UserType;
      isSuccess: boolean;
      isLoggedIn: boolean;
      message: string;
}
export const userSlice = createSlice({
      name: 'user',
      initialState: {
            data: [],
            isLoggedIn: window.localStorage.getItem('isLoggedIn') || false,
            isSuccess: false,
            message: '',
            currentUser: {} as UserType,
      } as UserProps,
      reducers: {},
      extraReducers: {
            // ------------------------- getUsers
            [getUsers.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Load data users successfully';
                  state.data = action.payload;
            },
            [getUsers.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },

            // ------------------------- updatePassword
            [updatePassword.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Update Password Successfully';
                  const findUser = state.data.find((user) => user.key === action.payload.id);
                  findUser && (findUser.password = action.payload.password);
            },
            [updatePassword.rejected.toString()]: (state, action) => {
                  state.message = 'Update Password Error';
                  state.isSuccess = false;
            },

            // ------------------------- Login

            [userLogin.fulfilled.toString()]: (state, action) => {
                  state.isLoggedIn = action.payload;
                  state.currentUser = action.payload;
                  window.localStorage.setItem('isLoggedIn', 'true');
            },

            // ------------------------- Logout
            [userLogout.fulfilled.toString()]: (state, action) => {
                  state.isLoggedIn = !action.payload;
                  window.localStorage.removeItem('isLoggedIn');
            },
      },
});

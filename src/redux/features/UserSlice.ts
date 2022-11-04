import { UserType } from '../../components/propsType/UserProps';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, child, get, update, set } from 'firebase/database';
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

export const addUser = createAsyncThunk('users/addUser', async (user: UserType) => {
      try {
            const randomNumber: number = Math.floor(Math.random() * 2001190238);
            await set(ref(database, `users/${user.key}`), {
                  active: user.active,
                  email: user.email,
                  fullName: user.fullName,
                  img: `https://source.unsplash.com/random/500x500?sig=${randomNumber}`,
                  key: user.key,
                  password: user.password,
                  phone: user.phone,
                  roleName: user.roleName,
                  userName: user.userName,
            });
            return user;
      } catch (error) {
            return error;
      }
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: UserType) => {
      try {
            await update(ref(database, `users/${user.key}`), {
                  key: user.key,
                  fullName: user.fullName,
                  phone: user.phone,
                  email: user.email,
                  roleName: user.roleName,
                  active: user.active,
                  userName: user.userName,
                  password: user.password,
                  img: user.img,
            });
            return user;
      } catch (error) {
            console.log(error);
      }
});

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
                  // Object.values => convert from list object to array object
                  state.data = Object.values(action.payload);
                  state.data.sort();
            },
            [getUsers.rejected.toString()]: (state, action) => {
                  state.message = action.payload;
                  state.isSuccess = false;
            },

            // ------------------------- updatePassword
            [updatePassword.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Update Password Successfully';
                  const findUser = state.data.find((user) => user.key === action.payload.key);
                  findUser && (findUser.password = action.payload.password);
                  console.log(state);
            },
            [updatePassword.rejected.toString()]: (state, action) => {
                  state.message = 'Update Password Error';
                  state.isSuccess = false;
            },

            // ------------------------- Login
            [userLogin.fulfilled.toString()]: (state, action) => {
                  state.isLoggedIn = true;
                  state.currentUser = action.payload;
            },

            // ------------------------- Logout
            [userLogout.fulfilled.toString()]: (state, action) => {
                  state.isLoggedIn = !action.payload;
                  window.localStorage.removeItem('isLoggedIn');
            },

            // ------------------------- addUser
            [addUser.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Add User Successfully';
                  state.data = [...state.data, action.payload];
            },
            [addUser.rejected.toString()]: (state, action) => {
                  state.message = 'Add User failed';
                  state.isSuccess = false;
            },

            // ------------------------- updateUser
            [updateUser.fulfilled.toString()]: (state, action) => {
                  state.isSuccess = true;
                  state.message = 'Update User Successfully';
                  state.data = [...state.data.filter((user) => user.key !== action.payload?.key), action.payload];
                  if (state.currentUser.key === action.payload?.key) {
                        state.currentUser = action.payload;
                  }
            },
            [updateUser.rejected.toString()]: (state, action) => {
                  state.message = 'Update User failed';
                  state.isSuccess = false;
            },
      },
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const configAuthAPI = {
  baseURL: 'https://connections-api.goit.global',
  timeout: 1000,
};

const authAPI = axios.create(configAuthAPI);

// Utility to add JWT
const setAuthHeader = token => {
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  authAPI.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) =>
    authAPI
      .post('/users/signup', credentials)
      .then(({ data }) => {
        console.log('Register response data: ', data);
        setAuthHeader(data.token);
        return data;
      })
      .catch(error => thunkAPI.rejectWithValue(error.message))
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) =>
    authAPI
      .post('/users/login', credentials)
      .then(({ data }) => {
        console.log('Login response data: ', data);
        setAuthHeader(data.token);
        return data;
      })
      .catch(error => thunkAPI.rejectWithValue(error.message))
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) =>
  authAPI
    .post('/users/logout')
    .then(() => clearAuthHeader())
    .catch(error => thunkAPI.rejectWithValue(error.message))
);

export const refreshUser = createAsyncThunk('auth/refresh', (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const storedToken = state.auth.token;

  if (!storedToken) return thunkAPI.rejectWithValue("User isn't logged in.");

  return authAPI
    .get('/users/current')
    .then(({ data }) => data)
    .catch(error => thunkAPI.rejectWithValue(error.message));
});

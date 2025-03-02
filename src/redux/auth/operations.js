import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const configAPI = {
  baseURL: 'https://connections-api.goit.global',
  timeout: 4000,
};

export const api = axios.create(configAPI);

// Utility to add JWT
const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) =>
    api
      .post('/users/signup', credentials)
      .then(({ data }) => {
        setAuthHeader(data.token);
        return data;
      })
      .catch(error => thunkAPI.rejectWithValue(error.message))
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) =>
    api
      .post('/users/login', credentials)
      .then(({ data }) => {
        setAuthHeader(data.token);
        return data;
      })
      .catch(error => thunkAPI.rejectWithValue(error.message))
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) =>
  api
    .post('/users/logout')
    .then(() => clearAuthHeader())
    .catch(error => thunkAPI.rejectWithValue(error.message))
);

export const refreshUser = createAsyncThunk('auth/refresh', (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const storedToken = state.auth.token;

  if (!storedToken) return thunkAPI.rejectWithValue("User isn't logged in.");

  setAuthHeader(storedToken);
  return api
    .get('/users/current')
    .then(({ data }) => data)
    .catch(error => thunkAPI.rejectWithValue(error.message));
});

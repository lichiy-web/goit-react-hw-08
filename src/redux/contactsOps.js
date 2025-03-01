import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://67b9dbeb51192bd378dea304.mockapi.io/";

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (signal, thunkAPI) => {
    return axios("phonebook", {signal: signal})
        .then(({ data }) => data)
        .catch(error => thunkAPI.rejectWithValue(error.message));
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
    return axios.post(`phonebook`, contact)
        .then(({ data }) => data)
        .catch(error => thunkAPI.rejectWithValue(error.message));
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
    return axios.delete(`phonebook/${contactId}`)
        .then(({ data }) => data.id)
        .catch(error => thunkAPI.rejectWithValue(error.message));
})

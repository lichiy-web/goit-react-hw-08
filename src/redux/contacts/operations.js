import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { api } from '../auth/operations';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (signal, thunkAPI) => {
    return api.get("/contacts", {signal: signal})
        .then(({ data }) => data)
        .catch(error => thunkAPI.rejectWithValue(error.message));
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
    return api.post("/contacts", contact)
        .then(({ data }) => data)
        .catch(error => thunkAPI.rejectWithValue(error.message));
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
    return api.delete(`/contacts/${contactId}`)
        .then(({ data }) => data.id)
        .catch(error => thunkAPI.rejectWithValue(error.message));
})

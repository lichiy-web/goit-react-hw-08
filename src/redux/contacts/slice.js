import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";
import { logIn, logOut, refreshUser, register } from "../auth/operations";


const initialState = {
    items: [],
    loading: false,
    error: null,
}

const slice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                if (action.payload === "canceled") return;
                state.error = action.payload;
            })
            .addCase(addContact.pending, state => {
                state.loading = true;                
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteContact.pending, state => {
                state.loading = true;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(register.fulfilled, state => {
                state.error = null;
                state.loading = false;
            } )
            .addCase(register.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(logIn.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(logIn.fulfilled, state => {
                state.error = null;
                state.loading = false;
            } )
            .addCase(logIn.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(logOut.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(logOut.fulfilled, () => initialState)
            .addCase(logOut.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(refreshUser.pending, state => {
                state.error = null;
                state.loading = true;
            })
            .addCase(refreshUser.fulfilled, state => {
                state.error = null;
                state.loading = false;
            } )
            .addCase(refreshUser.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
        
    }
})

export const contactsReducer = slice.reducer;
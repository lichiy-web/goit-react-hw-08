import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";
import { logIn, logOut, refreshUser, register } from "../auth/operations";
import toast from "react-hot-toast";

const handlePending = state => {    
                state.loading = true;
            }

const handleReject = (state, action) => {
                state.loading = false;
                if (action.payload === "canceled") return state;
                state.error = action.payload;
}

const handleAuthSuccess = state => {
                state.error = null;
                state.loading = false;
            }

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
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, handleReject)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, handleReject)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteContact.rejected, handleReject)
            .addCase(register.pending, handlePending)
            .addCase(register.fulfilled, handleAuthSuccess)
            .addCase(register.rejected, handleReject)
            .addCase(logIn.pending, handlePending)
            .addCase(logIn.fulfilled, handleAuthSuccess)
            .addCase(logIn.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload === 'Request failed with status code 400') {
                    toast.error("Wrong email or password");
                    return state;
                }
                state.error = payload;
            })
            .addCase(logOut.pending, handlePending)
            .addCase(logOut.fulfilled, () => initialState)
            .addCase(logOut.rejected, handleReject)
            .addCase(refreshUser.pending, handlePending)
            .addCase(refreshUser.fulfilled, handleAuthSuccess)
            .addCase(refreshUser.rejected, (state, { payload }) => {
                if (payload === "User isn't logged in") return initialState;           
                handleReject(state, { payload });
            })
        
    }
})

export const contactsReducer = slice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";

const initialState = {    
    name: ""
}

const slice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            state.name = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(logOut.fulfilled, () => initialState)
    }
})

export const filtersReducer = slice.reducer;
export const { changeFilter } = slice.actions;
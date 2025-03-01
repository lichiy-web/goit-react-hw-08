import { createSlice } from "@reduxjs/toolkit";

export const selectNameFilter = state => state.filters.name;

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
    }
})

export const filtersReducer = slice.reducer;
export const { changeFilter } = slice.actions;
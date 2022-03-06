

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFilterOn: false,
    isAllCategoryChecked: true,
    searchTitle: '',
    lastSearchTitle: ''
}

const filterDetailsSlice = createSlice({
    name: 'filterDetails',
    initialState,
    reducers: {
        toggleFilter: (state, { payload }) => {
            state.isFilterOn = payload
        },
        toggleAllCategory: (state, { payload }) => {
            state.isAllCategoryChecked = payload
        },
        updateSearchTitle: (state, { payload }) => {
            state.searchTitle = payload
        },
        updateLastSearchTitle: (state, { payload }) => {
            state.lastSearchTitle = payload
        }
    }
})

export const { toggleFilter, toggleAllCategory, updateSearchTitle,updateLastSearchTitle } = filterDetailsSlice.actions
export default filterDetailsSlice.reducer

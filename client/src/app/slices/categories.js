

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [
        {
            name: 'food',
            isChecked: true
        },
        {
            name: 'travel',
            isChecked: true
        },
        {
            name: 'health',
            isChecked: true
        },
        {
            name: 'lifestyle',
            isChecked: true
        },
        {
            name: 'fashion',
            isChecked: true
        },
        {
            name: 'photography',
            isChecked: true
        },
        {
            name: 'sports',
            isChecked: true
        },
        {
            name: 'personal',
            isChecked: true
        },
        {
            name: 'DIY',
            isChecked: true
        },
    ]
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        updateCategories: (state, { payload }) => {
            state.categories = payload
        },
        checkAllCategory: (state, { payload }) => {
            state.categories = state.categories.map(category => {
                return { ...category, isChecked: true }
            })
        },
        uncheckAllCategory: (state, { payload }) => {
            state.categories = state.categories.map(category => {
                return { ...category, isChecked: false }
            })
        },

    }
})

export const { updateCategories, checkAllCategory, uncheckAllCategory } = categoriesSlice.actions
export default categoriesSlice.reducer



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    country: '',
}

const profileForm = createSlice({
    name: 'profileForm',
    initialState,
    reducers: {
        updateFirstName: (state, { payload }) => {
            state.firstName = payload
        },
        updateLastName: (state, { payload }) => {
            state.lastName = payload
        },
        updateEmail: (state, { payload }) => {
            state.email = payload
        },
        updateCity: (state, { payload }) => {
            state.city = payload
        },
        updateCountry: (state, { payload }) => {
            state.country = payload
        },
    }
})

export const { updateFirstName, updateLastName, updateEmail, updateCity, updateCountry } = profileForm.actions
export default profileForm.reducer

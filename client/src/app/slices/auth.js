

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isAuthenticated: false
}

const auth = createSlice({
    name: 'isAuthenticated',
    initialState,
    reducers: {
        updateAuth: (state, {payload}) =>{
            state.isAuthenticated = payload
        }
    }
})

export const { updateAuth } = auth.actions
export default auth.reducer



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFormModalOpen: false
}

const formModal = createSlice({
    name: 'isAuthenticated',
    initialState,
    reducers: {
        updateModal: (state, {payload}) =>{
            state.isFormModalOpen = payload
        }
    }
})

export const { updateModal } = formModal.actions
export default formModal.reducer

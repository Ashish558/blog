

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isModalOpen: false,
   comments: []
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {
        toggleModal: (state, { payload }) => {
            state.isModalOpen = payload
        },
        updateComments: (state, { payload }) => {
            state.comments = payload
        },
    }
})

export const { toggleModal, updateComments } = commentsSlice.actions
export default commentsSlice.reducer

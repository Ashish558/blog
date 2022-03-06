

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: {},
    isModalOpen: false,
    comments: []
}

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updateSinglePost: (state, { payload }) => {
            state.post = payload
        },
        updateLikes: (state, { payload }) => {
            state.post ={
                ...state.post,
                isLiked: payload.isLiked,
                likesCount: payload.likesCount
            }
        },
        updateBookmark: (state, { payload }) => {
            state.post ={
                ...state.post,
                hasBookmarked: payload.hasBookmarked
            }
        },

        toggleModal: (state, { payload }) => {
            state.isModalOpen = payload
        },

        updateComments: (state, { payload }) => {
            state.comments = payload
        },
        addComment: (state, { payload }) => {
            state.comments.push(payload)
        },

    }
})

export const {
    updateSinglePost, updateLikes,
    updateBookmark, toggleModal,
    updateComments, addComment
} = posts.actions
export default posts.reducer

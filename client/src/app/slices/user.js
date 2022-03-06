

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmarks: [],
    bookmarkPosts: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateBookmarks: (state, { payload }) => {
            state.bookmarks = payload
        },
        updateBookmarkPosts: (state, { payload }) => {
            state.bookmarkPosts = payload
        },
        addToBookmarkPosts: (state, { payload }) => {
            state.bookmarkPosts.push(...payload)
        },
        updateHasBookmarked: (state, { payload }) => {
            return {
                ...state,
                bookmarkPosts: state.bookmarkPosts.map(post => post._id === payload._id ?
                    { ...post, hasBookmarked: payload.hasBookmarked } : post
                )
            }

        },

    }
})

export const { updateBookmarks, updateBookmarkPosts, addToBookmarkPosts, updateHasBookmarked } = userSlice.actions
export default userSlice.reducer

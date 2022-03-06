

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   posts: []
}
// { ...post, posted_by: [...post.posted_by[0], hasBookmarked: payload.hasBookmarked ] }
const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePosts: (state, {payload}) => {
            state.posts = payload
        },
        addToPosts: (state, {payload}) => {
            state.posts.push(...payload)
        },
        updateHasBookmarked: (state, {payload}) => {
            return {
                ...state, 
                posts: state.posts.map(post => post._id === payload._id ?
                    { ...post, hasBookmarked: payload.hasBookmarked } : post 
                )
            }

        },
        
    }
})

export const { updatePosts, addToPosts, updateHasBookmarked } = posts.actions
export default posts.reducer

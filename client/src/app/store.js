import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from './slices/auth'
import postsReducer from './slices/posts'
import profilePostsReducer from './slices/profilePosts'
import filterDetailsReducer from './slices/filterDetails'
import formModalReducer from './slices/formModal'
import categoriesReducer from './slices/categories'
import userReducer from './slices/user'
import singlePostReducer from './slices/singlePost'
import profileFormReducer from './slices/profileForm'
import dashboardArticlesReducer from './slices/dashboardArticles'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        formModal: formModalReducer,
        filterDetails: filterDetailsReducer,
        categories: categoriesReducer,
        posts: postsReducer,
        user: userReducer,
        singlePost: singlePostReducer,
        profileForm: profileFormReducer,
        dashboardArticles: dashboardArticlesReducer,
        profilePosts: profilePostsReducer,
    },
//    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
    devTools: true
})

setupListeners(store.dispatch)
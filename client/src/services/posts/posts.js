import axios from 'axios'
import { authHeader, domain } from '../constants'

const baseUrl = `${domain}/post`

// get all posts
export const getPosts = (postsToSkip, cb) => {

    axios.post(`${baseUrl}/`, { postsToSkip }, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

// get single post
export const getSinglePost = (id, cb) => {

    axios.get(`${baseUrl}/${id}`, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

// get Bookmarked posts
export const getBookmarkedPosts = (postsToSkip, cb) => {
    axios.post(`${baseUrl}/bookmarks`, { postsToSkip }, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

// for DASHBOARD - articles
export const getUserPosts = (postsToSkip, cb) => {
    axios.post(`${baseUrl}/user`, { postsToSkip }, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}


// get filtered posts
export const getFilteredPosts = (postsToSkip, categories, title, cb) => {

    axios.post(`${baseUrl}/filter`, { postsToSkip, categories, title }, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

// CRUD SERVICES

//create
export const createPost = (data, cb) => {
    axios.post(`${baseUrl}/create`, data, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

// edit post
export const editPost = (postId, data, cb) => {
    axios.put(`${baseUrl}/${postId}/edit`, data, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

// delete post
export const deletePost = (postId, cb) => {
    axios.put(`${baseUrl}/${postId}/delete`, {}, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}


//add like
export const addLikeToPost = (postId, cb) => {
    axios.put(`${baseUrl}/${postId}/add/like`, {}, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}

//remove like
export const removeLikeFromPost = (postId, cb) => {
    axios.put(`${baseUrl}/${postId}/remove/like`, {}, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}

//create step 2 - update image
export const updateImage = (postId, formData, cb) => {
    axios.post(`${baseUrl}/${postId}/update/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

//add view
export const addViewToPost = (postId, cb) => {
    axios.put(`${baseUrl}/${postId}/view`, {}, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}
// unused 

// Likes
export const getPostLikes = (postId, cb) => {
    axios.get(`${baseUrl}/${postId}/likes`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}


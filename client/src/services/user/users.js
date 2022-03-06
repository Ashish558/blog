import axios from 'axios'
import { authHeader, domain } from '../constants'

const baseUrl = `${domain}/user`

export const getUserBookmarks = (cb) => {
    axios.get(`${baseUrl}/bookmarks`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}


export const addToBookmarks = (postId, cb) => {
    axios.put(`${baseUrl}/bookmarks/add`, { postId }, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}



export const removeFromBookmarks = (postId, cb) => {
    axios.put(`${baseUrl}/bookmarks/remove`, { postId }, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}

export const updateProfileImage = (formData, cb) => {
    axios.post(`${baseUrl}/update/image`, formData, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}


export const getUserDetails = (cb) => {
    axios.get(`${baseUrl}/get/details`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}

export const getUserDashboardDetails = (cb) => {
    axios.get(`${baseUrl}/get/details/dashboard`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}

//for profile page
export const getUserProfileDetails = (userId, cb) => {
    userId = localStorage.getItem('user_id')
    axios.get(`${baseUrl}/profile/${userId}`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}


// update user details
export const updateUserDetails = (data, cb) => {

    axios.put(`${baseUrl}/update/details`, data, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}


import axios from 'axios'
import { authHeader, domain } from '../../constants'

const baseUrl = `${domain}/post`

export const getPostComments = (postId, cb) => {
    axios.get(`${baseUrl}/${postId}/comments`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}


export const addComment = (postId, comment, cb) => {
    axios.post(`${baseUrl}/${postId}/comment/add`, { comment }, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}


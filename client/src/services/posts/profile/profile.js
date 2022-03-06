import axios from 'axios'
import { authHeader, domain } from '../../constants'

const baseUrl = `${domain}/post`

//get post of a specific user
export const getUserPosts = (userId, postsToSkip, cb) => {
  
    axios.post(`${baseUrl}/user/${userId}`, { postsToSkip }, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}
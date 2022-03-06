import axios from "axios"
import { domain } from "./constants"



export const verifyAuth = (cb) => {
    axios.get(`${domain}/verify/auth`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(res => cb(null, true))
        .catch(err => cb(err, false))
}

import axios from "axios"
import { domain } from "./constants"

export const loginUser = (data, cb) => {

    axios.post(`${domain}/login`, data, {
        withCredentials: true,
        credentials: "include"
    })
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}

export const registerUser = (data, cb) => {
    axios.post(`${domain}/register`, data)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}
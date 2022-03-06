import axios from 'axios'
import { authHeader, domain } from '../constants'

const baseUrl = `${domain}/spoonacular/recipes`


export const searchPosts = (ingredients, title, offset, cb) => {

    axios.post(`${baseUrl}/complexSearch`, { ingredients, title, offset }, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}


export const searchPostsByTitle = (title, cb) => {
    axios.post(`${baseUrl}/complexSearch/title`, { title }, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

export const searchPostById = (id, cb) => {
    axios.get(`${baseUrl}/complexSearch/${id}`, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

export const searchSimilarRecipes = (id, cb) => {

    axios.get(`${baseUrl}/complexSearch/${id}/similar`, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

export const getImagesOfRecipes = (ids, cb) => {
  
    axios.post(`${baseUrl}/complexSearch/images`, { ids }, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

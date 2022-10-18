import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const profile = JSON.parse(localStorage.getItem('profile'))
        const token = profile.token
        req.headers.Authorization = `Bearer ${token}`
    }

    return req;
})

export const fetchPosts = () => API.get('posts')
export const makePost = (newPost) => API.post('posts', newPost)
export const updatePost = (id, postData) => API.patch(`posts/${id}`, postData)
export const deletePost = (id) => API.delete(`posts/${id}`)
export const likePost = (id) => API.patch(`posts/${id}/likepost`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
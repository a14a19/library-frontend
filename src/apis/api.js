import axios from "axios";

export const url = import.meta.env.VITE_BASE_URL;

export const baseUrl = async (body, params, options) => {
    return await axios.request({
        url: `${url}`,
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export const userSignUp = async (body, params, options) => {
    return await axios.request({
        url: `${url}/users/user`,
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: body,
    });
}

export const userSignIn = async (body, params, options) => {
    return await axios.request({
        url: `${url}/users/sign-in`,
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: body,
    });
}

export const getAllUsers = async (body, params, options) => {
    return await axios.request({
        url: `${url}/users`,
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
    });
}

export const allBooksData = async (body, params, options) => {
    return await axios.request({
        url: `${url}/books`,
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
    });
}

export const addBook = async (body, params, options) => {
    return await axios.request({
        url: `${url}/books/add`,
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
        data: body
    });
}

export const bookDataById = async (body, params, options) => {
    return await axios.request({
        url: `${url}/books/book/${params}`,
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
    });
}

export const bookDeleteById = async (body, params, options) => {
    return await axios.request({
        url: `${url}/books/delete/${params}`,
        method: "delete",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
    });
}

export const transTypeUpdate = async (body, params, options) => {
    return await axios.request({
        url: `${url}/lib-trans/update-trans?userId=${params.userId}&bookId=${params.bookId}`,
        method: "put",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
        data: body
    });
}

export const transTypeCreate = async (body, params, options) => {
    return await axios.request({
        url: `${url}/lib-trans/add`,
        method: "POST",
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        data: body
    });
}

export const getTransTypeUpdate = async (body, params, options) => {
    return await axios.request({
        url: `${url}/lib-trans/get-update-trans?userId=${params.userId}&bookId=${params.bookId}`,
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${options}`
        },
        withCredentials: true,
    });
}
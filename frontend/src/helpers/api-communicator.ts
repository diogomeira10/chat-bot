import axios from "axios"

export const userLogin = async (email: string, password: string) => {

    const response = await axios.post('/user/login', { email, password })
    console.log(response)

    if (response.status !== 200) {
        throw new Error('unable to login')
    }

    const data = await response.data;

    return data


}

export const userSignup = async (name: string, email: string, password: string) => {

    const response = await axios.post('/user/signup', {name, email, password })

    if (response.status !== 200) {
        throw new Error('Unable to Signup')
    }

    const data = await response.data;

    return data


}

export const checkAuthStatus = async () => {

    const response = await axios.get('/user/auth-status')

    if (response.status !== 200) {
        throw new Error('unable to authenticate')
    }

    const data = await response.data;

    return data


}

export const sendChatRequest = async (message: string) => {

    const response = await axios.post('/chat/new', {
        message
    })

    if (response.status !== 200) {
        throw new Error('unable to send message')
    }

    const data = await response.data;

    return data


}

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};




export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
};




export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
};
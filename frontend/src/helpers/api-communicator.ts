import axios from "axios"

export const userLogin = async (email: string, password: string) => {

    const response = await axios.post('/user/login', {email, password})
    console.log(response)

    if(response.status !== 200) {
        throw new Error('unable to login')
    }

    const data = await response.data;

    return data
    

}

export const checkAuthStatus = async () => {

    const response = await axios.get('/user/auth-status')
    console.log(response)

    if(response.status !== 200) {
        throw new Error('unable to authenticate')
    }

    const data = await response.data;

    return data
    

}

export const sendChatRequest = async (message: string) => {

    const response = await axios.post('/chat/new', {
        message
    })

    if(response.status !== 200) {
        throw new Error('unable to send message')
    }

    const data = await response.data;

    return data
    

}
import { createContext, useEffect, useState, ReactNode } from 'react'
import { userLogin, checkAuthStatus, logoutUser, userSignup } from '../helpers/api-communicator';

//types
type User = {
    name: string,
    email: string
}

type userAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}


export const AuthContext = createContext<userAuth | null>(null)


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {

        async function checkStatus() {
            const data = await checkAuthStatus()

            if (data) {
                setUser({ email: data.email, name: data.name })
                setisLoggedIn(true)
            }

        }

        checkStatus()
    }, [])

    const login = async (email: string, password: string) => {
        const data = await userLogin(email, password)
        if (data) {
            setUser({ email: data.email, name: data.name })
            setisLoggedIn(true)
        }
    }


    const signup = async (name: string, email: string, password: string) => {
        const data = await userSignup(name, email, password)

        if(data) {
            setUser({ email: data.email, name: data.name })
            setisLoggedIn(true)
        }

    }

    const logout = async () => {
        await logoutUser()
        setisLoggedIn(false)
        setUser(null)

    }



    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>


}


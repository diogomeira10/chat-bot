import { Request, Response, NextFunction } from 'express'
import { genSalt, hash, compare } from 'bcrypt'


//model
import User from '../models/user.js'


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()

        return res.status(200).json({ message: 'OK', users })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'ERROR', cause: error })
    }
}



export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body

    try {

        const emailExists = await User.findOne({ email: email })

        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const salt = await genSalt(10)

        const hashedPassword = await hash(password, salt)

        const user = await User.create({ name, email, password: hashedPassword })

        return res.status(201).json({ message: 'User created successfully', user: user })

    } catch (error) {
        res.status(400).json({ message: 'Could not signup', error })
    }


}


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Email is not registered' })
        }

        const match = await compare(password, user.password)

        if (!match) {
            return res.status(401).json({ message: 'Password is incorrect' })
        }

        return res.status(201).json({ message: 'User logged in sucessfully', user })


    } catch (error) {

        return res.status(401).json({ message: 'Could not login', error })

    }

}



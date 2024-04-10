import { Request, Response, NextFunction } from 'express'
import { genSalt, hash, compare } from 'bcrypt'
import { createToken } from '../utils/token_manager.js'
import { COOKIE_NAME } from '../utils/constants.js'

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

        const token = createToken(user._id.toString(), user.email, '7d')

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            signed: true,
            domain: "localhost",
            expires,
            httpOnly: true
            
        })

        return res.status(201).json({ message: 'User created successfully', name:user.name, email: user.email })

    } catch (error) {
        console.error("Error occurred during user signup:", error);
        res.status(400).json({ message: 'Could not signup', error });
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

        //using cookie parser to send the cookies directly from the backend to the frontend

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: '/'
        })

        const token = createToken(user._id.toString(), user.email, '7d')

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({ message: 'User logged in sucessfully', name:user.name, email: user.email })


    } catch (error) {

        return res.status(401).json({ message: 'Could not login', error })

    }

}


export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
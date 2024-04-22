import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from "dotenv";
import cors from 'cors';

config(); 

const app = express();

// Update origin to match your deployed frontend domain on Render.com

const devOrigin = 'http://localhost:5173'
const allowedOrigins = ['https://chat-bot-q0rp.onrender.com/', 'https://chat-bot-q0rp.onrender.com/login','https://chat-bot-q0rp.onrender.com/signup','https://chat-bot-q0rp.onrender.com/chat']

const corsOptions = {
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) =>{
        if(allowedOrigins.includes(origin)) {
            console.log(origin, allowedOrigins)
            callback(null,true)
        } else {
            callback(new Error('Not Allowed By CORS'))
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));

app.use(express.json()); 

app.use(cookieParser(process.env.COOKIE_SECRET)); 

app.use(morgan('dev')); 
app.use("/api/v1", appRouter); 

export default app;
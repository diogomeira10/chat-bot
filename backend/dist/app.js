import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from "dotenv";
import cors from 'cors';
config();
const app = express();
// Update origin to match your deployed frontend domain on Render.com
const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', // Fallback to localhost for development
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map
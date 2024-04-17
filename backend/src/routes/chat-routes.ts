import { Router } from "express";
import { verifyToken } from "../utils/token_manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, getUserChats } from "../controllers/chat-controllers.js";

const chatRoutes = Router()


chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion)
chatRoutes.get('/all-chats', verifyToken, getUserChats)
chatRoutes.delete('/delete', verifyToken, deleteChats)



export default chatRoutes
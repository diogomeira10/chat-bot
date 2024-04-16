import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionMessageParam[]

    // const userMessage = { role: "user", content: message }; // Create user message object
    // chats.push(userMessage); // Add user message to the chats array
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const config = configureOpenAI();
    const openai = new OpenAI(config);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    chats.push(chatCompletion.choices[0].message)
    user.chats.push(chatCompletion.choices[0].message);
    await user.save();
    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
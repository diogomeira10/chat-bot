import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuthContext } from "../hooks/useAuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";


type Message = {
  role: "user" | "assistant";
  content: string;
};



const Chat = () => {

  const [messages, setMessages] = useState<Message[]>([])

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const auth = useAuthContext()


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const content = inputRef.current?.value as string

    if (inputRef && inputRef.current) {
      inputRef.current.value = ''
    }

    if(content) {

      toast.loading("Loading Response", {id : "response"})

      const newMessage: Message = { role: 'user', content }
  
      setMessages((prev) => [...prev, newMessage])
  
      const chatData = await sendChatRequest(content)
  
  
      setMessages([...chatData.chats])

      toast.success("Response Given", {id: "response"})
    }


  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: 'deletechats' })
      await deleteUserChats()
      setMessages([])
      toast.success("Deleted Chats Successfully", { id: 'deletechats' })
    } catch (error) {
      console.log(error)
      toast.error("Could not delete chats", { id: 'deletechats' })
    }
  }


  useLayoutEffect(() => {

    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }

  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  // const user = auth?.user?.name.split(" ")[1][0]
  // console.log(user)

  const initials = () => {
    if (!auth || !auth.user || !auth.user.name) {
      return null; 
    }
  
    const trimmedName = auth.user.name.trim();
    const nameParts = trimmedName.split(" ");
  
    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();  
    } else {
      const firstInitial = nameParts[0][0].toUpperCase();
      const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();
      return `${firstInitial}${lastInitial}`;
    }
  };

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  // Scroll to the bottom of the message container whenever messages change
  messageContainerRef.current?.scrollTo({ top: messageContainerRef.current.scrollHeight });
}, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#24201D",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
          
            {initials()}

          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>


        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
          ref={messageContainerRef}
        >
          {messages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "#24201D",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <form style={{display: 'flex',justifyContent:'space-between',width: '100%' }} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "30px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{ color: "white", mx: 1 }}>
              <IoMdSend />
            </IconButton>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
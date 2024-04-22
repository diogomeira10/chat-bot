import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { AuthProvider } from './context/AuthContext.tsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
axios.defaults.baseURL = 'https://chat-bot-backend-ecku.onrender.com/api/v1'
axios.defaults.withCredentials = true; //allows setting the cookies directly from the backend


export const theme = createTheme({ typography: { fontFamily: "Montserrat, sans-serif", allVariants: { color: "white" } } })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-center'/>
            <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)

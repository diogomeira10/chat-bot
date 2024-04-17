import Header from './components/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { useAuthContext } from './hooks/useAuthContext'


function App() {

  const auth = useAuthContext()

  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {auth?.isLoggedIn && auth.user && <Route path='/chat' element={<Chat />} /> }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App

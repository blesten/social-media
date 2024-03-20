import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feeds from './pages/Feeds'
import Conversation from './pages/Conversation'
import ForgetPassword from './pages/ForgetPassword'
import Alert from './components/general/Alert'
import useStore from './store/store'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  const { refreshToken } = useStore()

  useEffect(() => {
    refreshToken()
  }, [refreshToken])

  return (
    <>
      <Alert />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/feeds/:id' element={<Feeds />} />
          <Route path='/conversation' element={<Conversation />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feeds from './pages/Feeds'
import Alert from './components/general/Alert'
import useStore from './store/store'

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
          <Route path='/feeds/:id' element={<Feeds />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
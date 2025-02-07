import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feeds from './pages/Feeds'
import Alert from './components/general/Alert'
import useStore from './store/store'
import NotFound from './pages/NotFound'

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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
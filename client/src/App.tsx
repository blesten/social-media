import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feeds from './pages/Feeds'
import Conversation from './pages/Conversation'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feeds' element={<Feeds />} />
          <Route path='/conversation' element={<Conversation />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
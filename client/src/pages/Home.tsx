import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from './../store/store'
import Navbar from './../components/general/Navbar'
import LeftContent from './../components/home/LeftContent'
import RightContent from './../components/home/RightContent'
import MiddleContent from './../components/home/MiddleContent'
import HeadInfo from '../utils/HeadInfo'

const Home = () => {
  const navigate = useNavigate()

  const { userState } = useStore()

  useEffect(() => {
    if (!userState.loading) {
      if (!userState.data.accessToken)
        navigate('/login')
    }
  }, [userState.data.accessToken, userState.loading, navigate])
  
  return (
    <>
      <HeadInfo title='Home' />
      <div className='bg-light-gray'>
        <Navbar />
        <div className='flex gap-6 min-h-screen pt-6'>
          <LeftContent />
          <MiddleContent />
          <RightContent />
        </div>
      </div>
    </>
  )
}

export default Home
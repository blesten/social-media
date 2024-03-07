import Navbar from './../components/general/Navbar'
import LeftContent from './../components/home/LeftContent'
import RightContent from './../components/home/RightContent'
import MiddleContent from './../components/home/MiddleContent'
import HeadInfo from '../utils/HeadInfo'

const Home = () => {
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
import { IoMdHome } from 'react-icons/io'
import { FaBookmark, FaUsers } from 'react-icons/fa'
import { IoPeopleSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import Navbar from './../components/general/Navbar'

const Home = () => {
  const { pathname } = useLocation()

  return (
    <div className='bg-light-gray'>
      <Navbar />
      <div className='flex gap-3 min-h-screen pt-6'>
        <div className='flex-1 h-fit sticky top-28 px-8 flex flex-col gap-2'>
          <Link to='/' className={`outline-none flex items-center gap-5 font-semibold rounded-lg py-3 px-8 hover:bg-gray-200 transition ${pathname === '/' ? 'bg-gray-200' : ' '}`}>
            <div className='w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center'>
              <IoMdHome className='text-blue-600 text-2xl' />
            </div>
            <p>Home</p>
          </Link>
          <Link to='/' className='outline-none flex items-center gap-5 font-semibold rounded-lg py-3 px-8 hover:bg-gray-200 transition'>
            <div className='w-10 h-10 rounded-full bg-green-300 flex items-center justify-center'>
              <IoPeopleSharp className='text-green-600 text-2xl' />
            </div>
            <p>Friends</p>
          </Link>
          <Link to='/' className='outline-none flex items-center gap-5 font-semibold rounded-lg py-3 px-8 hover:bg-gray-200 transition'>
            <div className='w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center'>
              <FaUsers className='text-orange-600 text-2xl' />
            </div>
            <p>Groups</p>
          </Link>
          <Link to='/' className='outline-none flex items-center gap-5 font-semibold rounded-lg py-3 px-8 hover:bg-gray-200 transition'>
            <div className='w-10 h-10 rounded-full bg-red-300 flex items-center justify-center'>
              <FaBookmark className='text-red-600 text-xl' />
            </div>
            <p>Saved</p>
          </Link>
        </div>
        <div className='flex-[3]'>

        </div>
        <div className='flex-1 h-fit sticky top-28 px-8'>
          <div className='border boder-gray-100 rounded-lg pb-3'>
            <div className='rounded-t-lg bg-gray-200 h-[100px] relative'>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full w-24 h-24 bg-gray-300'></div>
            </div>
            <div className='flex items-center justify-between px-4 py-3'>
              <div className='text-center'>
                <p className='text-lg mb-1'>1984</p>
                <p className='text-gray-500 text-xs'>Followers</p>
              </div>
              <div className='text-center'>
                <p className='text-lg mb-1'>2000</p>
                <p className='text-gray-500 text-xs'>Followings</p>
              </div>
            </div>
            <div className='text-center px-7 mt-1'>
              <h1 className='font-semibold mb-1'>Gianna Louis</h1>
              <p className='text-gray-500 text-xs'>@giannalouis</p>
              <p className='text-xs mt-4 leading-relaxed'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, atque.</p>
            </div>
          </div>
          <div className='mt-7'>
            <p className='font-semibold'>Latest Activity</p>
            <div className='mt-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
                <div>
                  <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
                  <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
                </div>
              </div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
                <div>
                  <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
                  <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
                <div>
                  <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
                  <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
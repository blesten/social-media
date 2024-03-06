import { IoMdGrid, IoMdSettings } from 'react-icons/io'
import Navbar from './../components/general/Navbar'
import { FaRegBookmark } from 'react-icons/fa'

const Feeds = () => {
  return (
    <div>
      <Navbar />
      <div className='w-1/2 m-auto py-10'>
        <div className='flex gap-10'>
          <div className='w-36 h-36 rounded-full bg-gray-200'></div>
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>giannalouis_</p>
              <div className='flex items-center gap-5'>
                <button className='bg-blue-500 rounded-md text-sm outline-none px-6 py-2 text-white font-semibold'>Edit Profile</button>
                <IoMdSettings className='text-xl text-gray-500' />
              </div>
            </div>
            <div className='flex items-center gap-14 mt-3'>
              <div>
                <p>20 posts</p>
              </div>
              <div>
                <p>158 followers</p>
              </div>
              <div>
                <p>80 followings</p>
              </div>
            </div>
            <div className='mt-3'>
              <p className='text-sm text-gray-500 text-justify'>Lorem ipsum dolor sit amet consectetur amet consectetur</p>
            </div>
            <div className='mt-3 text-xs font-semibold'>
              <p>Followed by blestenn_, johndoe</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-20 pb-5'>
        <div className='flex items-center gap-2 text-lg cursor-pointer relative after:content-[ ] after:absolute after:w-[140%] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-black after:-bottom-2'>
          <IoMdGrid />
          <p>Posts</p>
        </div>
        <div className='flex items-center gap-2 text-lg cursor-pointer'>
          <FaRegBookmark />
          <p>Saved</p>
        </div>
      </div>
      <div className='w-1/2 m-auto pt-8 pb-16 grid grid-cols-3 gap-x-20 gap-y-7'>
        <div className='w-64 h-64 bg-gray-200 rounded-lg'></div>
        <div className='w-64 h-64 bg-gray-200 rounded-lg'></div>
        <div className='w-64 h-64 bg-gray-200 rounded-lg'></div>
        <div className='w-64 h-64 bg-gray-200 rounded-lg'></div>
      </div>
    </div>
  )
}

export default Feeds
import { IoMdSettings } from "react-icons/io"

const Header = () => {
  return (
    <div className='w-1/2 m-auto py-10'>
      <div className='flex gap-10'>
        <div className='w-36 h-36 rounded-full bg-gray-200'></div>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold'>giannalouis_</p>
            <div className='flex items-center gap-5'>
              <button className='bg-blue-50 text-blue-500 hover:bg-blue-100 transition text-sm font-semibold px-4 py-2 rounded-md'>Follow Requests</button>
              <button className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold'>Edit Profile</button>
              <IoMdSettings className='text-xl text-gray-500 cursor-pointer' />
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
  )
}

export default Header
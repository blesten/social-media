import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiMessage2Fill } from 'react-icons/ri'
import { IoIosNotifications } from 'react-icons/io'
import { HiPlus } from 'react-icons/hi'

const Navbar = () => {
  const [keyword, setKeyword] = useState('')
  
  return (
    <div className='sticky top-0 shadow-light-gray shadow-sm bg-white w-full px-16 py-5 flex justify-between gap-24 items-center z-10'>
      <div className='flex-1'>
        <p>Friendss</p>
      </div>
      <div className='flex items-center gap-3 flex-[2] bg-light-gray rounded-full py-3 px-5'>
        <AiOutlineSearch />
        <div className='w-full relative'>
          <input type='text' className='outline-none w-full bg-transparent text-sm' value={keyword} onChange={e => setKeyword(e.target.value)} />
          <p className={`absolute top-0 text-gray-400 text-sm ${keyword.length > 0 ? 'hidden' : 'block'}`}>Search for friends, groups, pages</p>
        </div>
      </div>
      <div className='flex-1 flex justify-end gap-6'>
        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
          <HiPlus className='text-lg text-gray-800' />
        </div>
        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
          <RiMessage2Fill className='text-lg text-gray-800' />
        </div>
        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
          <IoIosNotifications className='text-xl text-gray-800' />
        </div>
        <div className='w-10 h-10 rounded-full bg-gray-200'></div>
      </div>
    </div>
  )
}

export default Navbar
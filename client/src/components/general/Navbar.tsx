import { useState, useEffect, useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiMessage2Fill } from 'react-icons/ri'
import { IoIosNotifications } from 'react-icons/io'
import { HiPlus } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import UpsertPost from '../overlay/UpsertPost'
import { MdNotificationsOff } from 'react-icons/md'
import { TbError404 } from 'react-icons/tb'

const Navbar = () => {
  const [keyword, setKeyword] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)

  const notificationRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openNotification && notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setOpenNotification(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNotification])
  
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openUpsertPostOverlay && upsertPostOverlayRef.current && !upsertPostOverlayRef.current.contains(e.target as Node)) {
        setOpenUpsertPostOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openUpsertPostOverlay])
  
  return (
    <>
      <div className='sticky top-0 shadow-light-gray shadow-sm bg-white w-full px-16 py-5 flex justify-between gap-24 items-center z-10'>
        <Link to='/' className='flex-1 flex items-center gap-4 outline-none'>
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Social Sphere' className='w-10' />
          <p className='text-lg font-semibold text-blue-500'>Social Sphere</p>
        </Link>
        <div className='flex-[2] relative'>
          <div className='flex items-center gap-3 bg-light-gray rounded-full py-3 px-5'>
            <AiOutlineSearch />
            <div className='w-full relative'>
              <input type='text' className='outline-none w-full bg-transparent text-sm' value={keyword} onChange={e => setKeyword(e.target.value)} />
              <p className={`absolute top-0 text-gray-400 text-sm ${keyword.length > 0 ? 'hidden' : 'block'}`}>Search for friends</p>
            </div>
          </div>
          {/* <div className='absolute top-full left-0 w-full mt-3 bg-white shadow-md border border-gray-200 rounded-md p-4 grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto hide-scrollbar'>
            <div className='flex items-center justify-center flex-col text-gray-500'>
              <TbError404 className='text-7xl text-gray-400' />
              <p className='font-semibold text-sm'>No results found</p>
            </div> */}
            {/* <div className='flex items-center justify-between bg-light-gray rounded-md p-3'>
              <div className='flex items-center gap-3'>
                <div className='w-14 h-14 rounded-full bg-gray-200' />
                <div>
                  <p className='font-semibold text-sm'>John Doe</p>
                  <p className='text-xs text-gray-500 mt-1'>@johndoe</p>
                </div>
              </div>
              <button className='text-xs text-white font-semibold bg-blue-500 px-4 rounded-md py-2'>Follow</button>
            </div> */}
          {/* </div> */}
        </div>
        <div className='flex-1 flex justify-end gap-6'>
          <div onClick={() => setOpenUpsertPostOverlay(true)} className='cursor-pointer w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
            <HiPlus className='text-lg text-gray-800' />
          </div>
          <Link to='/conversation' className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center outline-none'>
            <RiMessage2Fill className='text-lg text-gray-800' />
          </Link>
          <div className='relative'>
            <div ref={notificationRef} onClick={() => setOpenNotification(!openNotification)} className='cursor-pointer w-10 h-10 rounded-full bg-gray-100 flex items-cen ter justify-center relative'>
              <IoIosNotifications className='text-xl text-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
            </div>
            <div className={`absolute top-full right-0 bg-white border border-gray-300 shadow-md rounded-md w-[320px] mt-3 origin-top ${openNotification ? 'scale-y-100' : 'scale-y-0'} transition`}>
              <div className='flex items-center justify-center p-4 flex-col'>
                <MdNotificationsOff className='text-gray-400 text-4xl' />
                <p className='text-sm text-gray-400 font-semibold mt-3'>Notification is empty</p>
              </div>
              {/* <div className='flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-light-gray'>
                <p className='text-sm'><strong>John Doe</strong> just follows you</p>
                <p className='text-gray-500 font-semibold text-xs'>14mins ago</p>
              </div>
              <div className='flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-light-gray'>
                <p className='text-sm'><strong>John Doe</strong> just follows you</p>
                <p className='text-gray-500 font-semibold text-xs'>14mins ago</p>
              </div> */}
            </div>
          </div>
          <Link to='/feeds' className='w-10 h-10 rounded-full bg-gray-200 outline-none'></Link>
        </div>
      </div>

      <UpsertPost
        openUpsertPostOverlay={openUpsertPostOverlay}
        setOpenUpsertPostOverlay={setOpenUpsertPostOverlay}
        upsertPostOverlayRef={upsertPostOverlayRef}
      />
    </>
  )
}

export default Navbar
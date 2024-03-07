import { useState, useEffect, useRef } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { MdNotificationsOff } from 'react-icons/md'
import { RiMessage2Fill } from 'react-icons/ri'
import { HiPlus } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import UpsertPost from './../overlay/UpsertPost'

const Utility = () => {
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)

  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const notificationRef = useRef() as React.MutableRefObject<HTMLDivElement>
  
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openUpsertPostOverlay && upsertPostOverlayRef.current && !upsertPostOverlayRef.current.contains(e.target as Node)) {
        setOpenUpsertPostOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openUpsertPostOverlay])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openNotification && notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setOpenNotification(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNotification])

  return (
    <>
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
            {/* <NotificationCard /> */}
          </div>
        </div>
        <Link to='/feeds/639ejfdffd89' className='w-10 h-10 rounded-full bg-gray-200 outline-none'></Link>
      </div>

      <UpsertPost
        openUpsertPostOverlay={openUpsertPostOverlay}
        setOpenUpsertPostOverlay={setOpenUpsertPostOverlay}
        upsertPostOverlayRef={upsertPostOverlayRef}
      />
    </>
  )
}

export default Utility
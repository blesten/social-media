import { useState, useEffect, useRef } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { MdNotificationsOff } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { INotification } from '../../utils/interface'
import { getDataAPI } from '../../utils/fetchData'
import useStore from './../../store/store'
import UpsertPost from './../overlay/UpsertPost'
import NotificationCard from './NotificationCard'

const Utility = () => {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)

  const { userState } = useStore()

  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const notificationRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const fetchNotifications = async(token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/notifications`, token)
        setNotifications(res.data.notifications)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      fetchNotifications(userState.data.accessToken)
  }, [userState.data.accessToken])
  
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
      <div className='flex-1 lg:flex hidden justify-end gap-6'>
        <div onClick={() => setOpenUpsertPostOverlay(true)} className='cursor-pointer w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center'>
          <HiPlus className='text-lg text-neutral-300' />
        </div>
        <div className='relative'>
          <div ref={notificationRef} onClick={() => setOpenNotification(!openNotification)} className='cursor-pointer w-10 h-10 rounded-full bg-zinc-700 flex items-cen ter justify-center relative'>
            <IoIosNotifications className='text-xl text-neutral-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className={`absolute top-full right-0 bg-zinc-700 shadow-md rounded-md w-[450px] mt-3 origin-top ${openNotification ? 'scale-y-100' : 'scale-y-0'} transition`}>
            {
              notifications.length < 1
              ? (
                <>
                  <div className='flex items-center justify-center p-4 flex-col text-neutral-500'>
                    <MdNotificationsOff className='text-4xl' />
                    <p className='text-sm font-semibold mt-3'>Notification is empty</p>
                  </div>
                </>
              )
              : (
                <>
                  {
                    notifications.map(item => (
                      <NotificationCard
                        key={item._id}
                        username={item.username}
                        avatar={item.avatar}
                        message={item.message}
                        createdAt={item.createdAt}
                      />
                    ))
                  }
                </>
              )
            }
          </div>
        </div>
        <Link to={`/feeds/${userState.data.user?._id}`} className='w-10 h-10 rounded-full bg-zinc-700 text-neutral-300 flex items-center justify-center outline-none'>
          {
            !userState.data.user?.avatar
            ? <p className='font-semibold tracking-widest'>{`${userState.data.user?.name[0]}${userState.data.user?.name.split(' ')[userState.data.user?.name.split(' ').length - 1][0]}`}</p>
            : <img src={userState.data.user?.avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover' />
          }
        </Link>
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
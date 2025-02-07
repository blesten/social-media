import { useState, useEffect, useRef } from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiPlus } from 'react-icons/hi'
import { IoIosNotifications } from 'react-icons/io'
import { MdNotificationsOff } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { INotification, IUser } from '../../utils/interface'
import { getDataAPI } from '../../utils/fetchData'
import useStore from './../../store/store'
import Logo from './../navbar/Logo'
import Search from './../navbar/Search'
import Utility from './../navbar/Utility'
import UpsertPost from '../overlay/UpsertPost'
import UserCard from '../home/UserCard'
import NotificationCard from '../navbar/NotificationCard'
import { PiNoteBlankLight } from 'react-icons/pi'

const Navbar = () => {  
  const [keyword, setKeyword] = useState('')
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [notifications, setNotifications] = useState<INotification[]>([])

  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const searchResultRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const notificationRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const { userState } = useStore()

  const handleClickUpsertPost = () => {
    setOpenSidebar(false)
    setOpenUpsertPostOverlay(true)
  }

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
    const searchUser = async(token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/search?username=${keyword}`, token)
        setUsers(res.data.users)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (keyword.length > 3) {
      if (userState.data.accessToken) {
        searchUser(userState.data.accessToken)
      }
    }
  }, [keyword, userState.data.accessToken])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpenSidebar(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSidebar])

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

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (keyword.length > 3 && searchResultRef.current && !searchResultRef.current.contains(e.target as Node)) {
        setKeyword('')
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [keyword])

  return (
    <>
      <div className='sticky top-0 z-10'>
        <div className='bg-zinc-900 w-full lg:px-16 px-10 py-5 flex justify-between gap-24 items-center'>
          <Logo />
          <Search />
          <Utility />
          <GiHamburgerMenu onClick={() => setOpenSidebar(true)} className='text-neutral-300 text-lg cursor-pointer lg:hidden block' />
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.8)] z-10 ${openSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition`}>
        <div ref={sidebarRef} className={`fixed top-0 right-0 w-[300px] h-screen bg-zinc-800 z-10 px-6 py-6 ${openSidebar ? 'scale-x-100' : 'scale-x-0'} origin-right transition`}>
          <div className='flex justify-end'>
            <AiOutlineClose onClick={() => setOpenSidebar(false)} className='cursor-pointer w-fit text-neutral-300' />
          </div>
          <div className='relative'>
            <div className='flex items-center gap-3 bg-zinc-700 rounded-full py-3 px-5 mt-6'>
              <AiOutlineSearch className='text-neutral-500' />
              <div className='w-full relative'>
                <input type='text' className='outline-none text-neutral-300 w-full bg-transparent text-sm' value={keyword} onChange={e => setKeyword(e.target.value)} />
                <p className={`absolute pt-[2px] top-0 ${keyword ? 'text-neutral-300' : 'text-neutral-500'} text-sm ${keyword.length > 0 ? 'hidden' : 'block'} pointer-events-none`}>Search for friends</p>
              </div>
            </div>
            {
              keyword.length > 3 &&
              <div ref={searchResultRef} className='absolute top-full left-0 w-full mt-3 bg-zinc-700 rounded-md p-4 flex flex-col gap-4 max-h-[300px] overflow-y-auto hide-scrollbar z-20'>
                {
                  users.length < 1
                  ? (
                    <div className='flex flex-col items-center gap-3 text-neutral-500'>
                      <div className='relative'>
                        <PiNoteBlankLight className='text-6xl' />
                        <div className='absolute -top-3 left-6 w-1 h-20 bg-neutral-600 rotate-45' />
                      </div>
                      <p className='text-xs font-semibold'>No results found</p>
                    </div>
                  )
                  : (
                    <>
                      {
                        users.map((item, idx) => (
                          <UserCard
                            user={item}
                            key={idx}
                            extraStyle='bg-zinc-600 p-4 rounded-md mb-0'
                          />
                        ))
                      }
                    </>
                  )
                }
              </div>
            }
          </div>
          <div className='mt-7 flex items-center justify-center gap-5'>
            <div onClick={handleClickUpsertPost} className='cursor-pointer w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center'>
              <HiPlus className='text-lg text-neutral-300' />
            </div>
            <div className='relative'>
              <div ref={notificationRef} onClick={() => setOpenNotification(!openNotification)} className='cursor-pointer w-10 h-10 rounded-full bg-neutral-700 flex items-cen ter justify-center relative'>
                <IoIosNotifications className='text-xl text-neutral-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
              </div>
              <div className={`absolute top-full -right-24 bg-zinc-700 rounded-md w-[320px] mt-3 origin-top ${openNotification ? 'scale-y-100' : 'scale-y-0'} transition`}>
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
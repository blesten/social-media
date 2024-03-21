import { useState, useEffect, useRef } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { FaUsers } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { IUser } from './../../utils/interface'
import useStore from './../../store/store'
import Followers from './../overlay/Followers'
import Followings from '../overlay/Followings'
import FollowRequests from '../overlay/FollowRequests'
import EditProfile from '../overlay/EditProfile'
import Setting from '../overlay/Setting'

interface IProps {
  user: IUser
}

const Header: React.FC<IProps> = ({ user }) => {
  const [openFollowersOverlay, setOpenFollowersOverlay] = useState(false)
  const [openFollowingsOverlay, setOpenFollowingsOverlay] = useState(false)
  const [openFollowRequestsOverlay, setOpenFollowRequestsOverlay] = useState(false)
  const [openEditProfileOverlay, setOpenEditProfileOverlay] = useState(false)
  const [openSettingOverlay, setOpenSettingOverlay] = useState(false)

  const followersOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const followingsOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const followRequestsOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const editProfileOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const settingOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const { userState } = useStore()

  const handleOpenFollowers = () => {
    if (!user.private || userState.data.user?._id === user._id) {
      setOpenFollowersOverlay(true)
    }
  }

  const handleOpenFollowings = () => {
    if (!user.private || userState.data.user?._id === user._id) {
      setOpenFollowingsOverlay(true)
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openFollowersOverlay && followersOverlayRef.current && !followersOverlayRef.current.contains(e.target as Node)) {
        setOpenFollowersOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFollowersOverlay])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openFollowingsOverlay && followingsOverlayRef.current && !followingsOverlayRef.current.contains(e.target as Node)) {
        setOpenFollowingsOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFollowingsOverlay])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openFollowRequestsOverlay && followRequestsOverlayRef.current && !followRequestsOverlayRef.current.contains(e.target as Node)) {
        setOpenFollowRequestsOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFollowRequestsOverlay])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openEditProfileOverlay && editProfileOverlayRef.current && !editProfileOverlayRef.current.contains(e.target as Node)) {
        setOpenEditProfileOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openEditProfileOverlay])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSettingOverlay && settingOverlayRef.current && !settingOverlayRef.current.contains(e.target as Node)) {
        setOpenSettingOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSettingOverlay])

  return (
    <>
      <div className='xl:w-1/2 lg:w-2/3 w-full m-auto lg:py-10 py-7 lg:px-0 px-10'>
        <div className='flex gap-10 items-center  '>
          <div className='md:w-36 md:h-36 w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center bg-blue-500 text-white'>
            {
              !user.avatar && <p className='text-5xl font-semibold tracking-widest'>{`${user.name[0]}${user.name.split(' ')[user.name.split(' ').length - 1][0]}`}</p>
            }
          </div>
          <div className='flex-1'>
            <div className='flex md:flex-row flex-col md:items-center justify-between'>
              <p className='text-lg font-semibold'>{user.username}</p>
              {
                userState.data.user?._id === user._id
                ? (
                  <div className='md:mt-0 mt-5 flex items-center gap-5'>
                    <button onClick={() => setOpenFollowRequestsOverlay(true)} className='bg-blue-50 text-blue-500 hover:bg-blue-100 transition text-sm font-semibold px-4 py-2 rounded-md sm:block hidden'>Follow Requests</button>
                    <button onClick={() => setOpenEditProfileOverlay(true)} className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold sm:block hidden'>Edit Profile</button>
                    <IoMdSettings onClick={() => setOpenSettingOverlay(true)} className='text-xl text-gray-500 cursor-pointer sm:block hidden' />
                    {/* mobile version utility button */}
                    <button onClick={() => setOpenFollowRequestsOverlay(true)} className='bg-blue-50 text-blue-500 hover:bg-blue-100 transition text-sm font-semibold px-6 py-2 rounded-md sm:hidden block'><FaUsers /></button>
                    <button onClick={() => setOpenEditProfileOverlay(true)} className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold sm:hidden block'><FiEdit /></button>
                    <IoMdSettings onClick={() => setOpenSettingOverlay(true)} className='text-xl text-gray-500 cursor-pointer sm:hidden block' />
                  </div>
                )
                : (
                  <button className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold sm:mt-0 mt-3'>Follow</button>
                )
              }
            </div>
            <div className='md:block hidden'>
              <div className='flex items-center gap-14 mt-3'>
                <div>
                  <p className='font-semibold'>20 posts</p>
                </div>
                <div onClick={handleOpenFollowers} className='cursor-pointer'>
                  <p className='font-semibold'>158 followers</p>
                </div>
                <div onClick={handleOpenFollowings} className='cursor-pointer'>
                  <p className='font-semibold'>80 followings</p>
                </div>
              </div>
              <div className='mt-3'>
                <p className='text-sm text-gray-500 text-justify'>{userState.data.user?.description}</p>
              </div>
              <div className='mt-3 text-xs font-semibold'>
                <p>Followed by blestenn_, johndoe</p>
              </div>
            </div>
          </div>
        </div>
        <div className='md:hidden block mt-5'>
          <div className='flex items-center gap-10 mt-3'>
            <div>
              <p className='font-semibold'>20 posts</p>
            </div>
            <div onClick={handleOpenFollowers} className='cursor-pointer'>
              <p className='font-semibold'>158 followers</p>
            </div>
            <div onClick={handleOpenFollowings} className='cursor-pointer'>
              <p className='font-semibold'>80 followings</p>
            </div>
          </div>
          <div className='mt-3'>
            <p className='text-sm text-gray-500 text-justify'>{userState.data.user?.description}</p>
          </div>
          <div className='mt-3 text-xs font-semibold'>
            <p>Followed by blestenn_, johndoe</p>
          </div>
        </div>
      </div>

      <Followers
        openFollowersOverlay={openFollowersOverlay}
        setOpenFollowersOverlay={setOpenFollowersOverlay}
        followersOverlayRef={followersOverlayRef}
      />

      <Followings
        openFollowingsOverlay={openFollowingsOverlay}
        setOpenFollowingsOverlay={setOpenFollowingsOverlay}
        followingsOverlayRef={followingsOverlayRef}
      />

      <FollowRequests
        openFollowRequestsOverlay={openFollowRequestsOverlay}
        setOpenFollowRequestsOverlay={setOpenFollowRequestsOverlay}
        followRequestOverlayRef={followRequestsOverlayRef}
      />

      <EditProfile
        openEditProfileOverlay={openEditProfileOverlay}
        setOpenEditProfileOverlay={setOpenEditProfileOverlay}
        editProfileOverlayRef={editProfileOverlayRef}
      />

      <Setting
        openSettingOverlay={openSettingOverlay}
        setOpenSettingOverlay={setOpenSettingOverlay}
        settingOverlayRef={settingOverlayRef}
      />
    </>
  )
}

export default Header
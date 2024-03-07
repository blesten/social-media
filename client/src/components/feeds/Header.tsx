import { useState, useEffect, useRef } from 'react'
import { IoMdSettings } from 'react-icons/io'
import Followers from './../overlay/Followers'
import Followings from '../overlay/Followings'
import FollowRequests from '../overlay/FollowRequests'
import EditProfile from '../overlay/EditProfile'
import Setting from '../overlay/Setting'

const Header = () => {
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
      <div className='w-1/2 m-auto py-10'>
        <div className='flex gap-10'>
          <div className='w-36 h-36 rounded-full bg-gray-200'></div>
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>giannalouis_</p>
              <div className='flex items-center gap-5'>
                <button onClick={() => setOpenFollowRequestsOverlay(true)} className='bg-blue-50 text-blue-500 hover:bg-blue-100 transition text-sm font-semibold px-4 py-2 rounded-md'>Follow Requests</button>
                <button onClick={() => setOpenEditProfileOverlay(true)} className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold'>Edit Profile</button>
                <IoMdSettings onClick={() => setOpenSettingOverlay(true)} className='text-xl text-gray-500 cursor-pointer' />
              </div>
            </div>
            <div className='flex items-center gap-14 mt-3'>
              <div>
                <p>20 posts</p>
              </div>
              <div onClick={() => setOpenFollowersOverlay(true)} className='cursor-pointer'>
                <p>158 followers</p>
              </div>
              <div onClick={() => setOpenFollowingsOverlay(true)} className='cursor-pointer'>
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
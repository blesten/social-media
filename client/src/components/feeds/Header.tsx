import { useState, useEffect, useRef } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { FaUsers } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { IFollow, IPost, IUser } from './../../utils/interface'
import useStore from './../../store/store'
import Followers from './../overlay/Followers'
import Followings from '../overlay/Followings'
import FollowRequests from '../overlay/FollowRequests'
import EditProfile from '../overlay/EditProfile'
import Setting from '../overlay/Setting'

interface IProps {
  user: IUser
  followers: IFollow[]
  followings: IFollow[]
  followRequests: IFollow[]
  posts: IPost[]
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>
}

const Header: React.FC<IProps> = ({ user, followers, followings, followRequests, posts, setUser }) => {
  const [openFollowersOverlay, setOpenFollowersOverlay] = useState(false)
  const [openFollowingsOverlay, setOpenFollowingsOverlay] = useState(false)
  const [openFollowRequestsOverlay, setOpenFollowRequestsOverlay] = useState(false)
  const [openEditProfileOverlay, setOpenEditProfileOverlay] = useState(false)
  const [openSettingOverlay, setOpenSettingOverlay] = useState(false)
  const [followStatus, setFollowStatus] = useState('Follow')

  const followersOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const followingsOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const followRequestsOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const editProfileOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const settingOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const { userState, follow, unfollow } = useStore()

  const handleOpenFollowers = () => {
    if (
      !user.private ||
      userState.data.user?._id === user._id ||
      followers.some(item => item.user._id === userState.data.user?._id)
    ) {
      setOpenFollowersOverlay(true)
    }
  }

  const handleOpenFollowings = () => {
    if (
      !user.private ||
      userState.data.user?._id === user._id ||
      followers.some(item => item.user._id === userState.data.user?._id)
    ) {
      setOpenFollowingsOverlay(true)
    }
  }
  
  const handleClickFollow = async() => {
    if (followStatus === 'Follow' ||  followStatus === 'Unfollow') {
      if (userState.followings.some(item => item.user._id === user?._id)) {
        await unfollow(user?._id!, userState.data.accessToken!)
      } else {
        await follow(user?._id!, userState.data.accessToken!)
      }
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

  useEffect(() => {
    const curr = userState.followings.find(item => item.user._id === user?._id)
    if (curr && curr.status === 1) {
      setFollowStatus('Unfollow')
    } else if (curr && curr.status === 0) {
      setFollowStatus('Requested')
    } else {
      setFollowStatus('Follow')
    }
  }, [userState.followings, user?._id])

  return (
    <>
      <div className='xl:w-1/2 lg:w-2/3 w-full m-auto lg:py-10 py-7 lg:px-0 px-10'>
        <div className='flex gap-10 items-center  '>
          <div className='md:w-32 md:h-32 w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-800 text-neutral-300'>
            {
              !user.avatar
              ? <p className='text-4xl font-semibold tracking-widest'>{`${user.name[0]}${user.name.split(' ')[user.name.split(' ').length - 1][0]}`}</p>
              : <img src={user.avatar} alt='User Avatar' className='w-full h-full rounded-full object-cover' />
            }
          </div>
          <div className='flex-1'>
            <div className='flex md:flex-row flex-col md:items-start justify-between'>
              <div className='flex flex-col gap-1'>
                <p className='text-lg text-neutral-300 font-semibold'>{user.name}</p>
                <p className='text-sm font-semibold rounded-md text-neutral-500'>@{user.username}</p>
              </div>
              {
                userState.data.user?._id === user._id
                ? (
                  <div className='md:mt-0 mt-5 flex items-center gap-5'>
                    <button onClick={() => setOpenFollowRequestsOverlay(true)} className='text-neutral-300 bg-zinc-700 transition text-sm font-semibold px-4 py-2 rounded-md sm:block hidden'>Follow Requests</button>
                    <button onClick={() => setOpenEditProfileOverlay(true)} className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold sm:block hidden'>Edit Profile</button>
                    <IoMdSettings onClick={() => setOpenSettingOverlay(true)} className='text-xl text-gray-500 cursor-pointer sm:block hidden' />
                    {/* mobile version utility button */}
                    <button onClick={() => setOpenFollowRequestsOverlay(true)} className='text-neutral-300 bg-zinc-700 transition text-sm font-semibold px-6 py-2 rounded-md sm:hidden block'><FaUsers /></button>
                    <button onClick={() => setOpenEditProfileOverlay(true)} className='bg-blue-500 rounded-md text-sm outline-none transition hover:bg-blue-600 px-6 py-2 text-white font-semibold sm:hidden block'><FiEdit /></button>
                    <IoMdSettings onClick={() => setOpenSettingOverlay(true)} className='text-xl text-gray-500 cursor-pointer sm:hidden block' />
                  </div>
                )
                : (
                  <button onClick={handleClickFollow} className={`${followStatus === 'Unfollow' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100 border border-blue-100' : followStatus === 'Follow' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-zinc-600 text-neutral-400 cursor-not-allowed'} rounded-md text-sm outline-none transition px-6 py-2 font-semibold sm:mt-0 mt-3`}>
                    {followStatus}
                  </button>
                )
              }
            </div>
            <div className='md:block hidden'>
              <div className='flex items-center gap-14 mt-3 text-neutral-300'>
                <div>
                  <p className='font-semibold'>{posts.length} {posts.length > 1 ? 'posts' : 'post'}</p>
                </div>
                <div onClick={handleOpenFollowers} className='cursor-pointer'>
                  <p className='font-semibold'>{followers.length} {followers.length > 1 ? 'followers' : 'follower'}</p>
                </div>
                <div onClick={handleOpenFollowings} className='cursor-pointer'>
                  <p className='font-semibold'>{followings.length} {followings.length > 1 ? 'followings' : 'following'}</p>
                </div>
              </div>
              <div className='mt-3'>
                <p className='text-sm text-gray-500 text-justify'>{user.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='md:hidden block mt-5'>
          <div className='flex items-center gap-10 mt-3 text-neutral-300'>
            <div>
              <p className='font-semibold'>{posts.length} {posts.length > 1 ? 'posts' : 'post'}</p>
            </div>
            <div onClick={handleOpenFollowers} className='cursor-pointer'>
              <p className='font-semibold'>{followers.length} {followers.length > 1 ? 'followers' : 'follower'}</p>
            </div>
            <div onClick={handleOpenFollowings} className='cursor-pointer'>
              <p className='font-semibold'>{followings.length} {followings.length > 1 ? 'followings' : 'following'}</p>
            </div>
          </div>
          <div className='mt-3'>
            <p className='text-sm text-gray-500 text-justify'>{user.description}</p>
          </div>
        </div>
      </div>

      <Followers
        openFollowersOverlay={openFollowersOverlay}
        setOpenFollowersOverlay={setOpenFollowersOverlay}
        followersOverlayRef={followersOverlayRef}
        followers={followers}
      />

      <Followings
        openFollowingsOverlay={openFollowingsOverlay}
        setOpenFollowingsOverlay={setOpenFollowingsOverlay}
        followingsOverlayRef={followingsOverlayRef}
        followings={followings}
      />

      <FollowRequests
        openFollowRequestsOverlay={openFollowRequestsOverlay}
        setOpenFollowRequestsOverlay={setOpenFollowRequestsOverlay}
        followRequestOverlayRef={followRequestsOverlayRef}
        followRequests={followRequests}
      />

      <EditProfile
        openEditProfileOverlay={openEditProfileOverlay}
        setOpenEditProfileOverlay={setOpenEditProfileOverlay}
        editProfileOverlayRef={editProfileOverlayRef}
        user={user}
        setUser={setUser}
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
import { useState, useEffect } from 'react'
import { IFollow, IPost } from '../../utils/interface'
import useStore from './../../store/store'
import { getDataAPI } from '../../utils/fetchData'

const ProfileOverview = () => {
  const { userState } = useStore()
  const [followers, setFollowers] = useState<IFollow[]>([])
  const [followings, setFollowings] = useState<IFollow[]>([])
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    const getFollowers = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/${id}/followers`, token)
        setFollowers(res.data.followers)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      getFollowers(`${userState.data.user?._id}`, userState.data.accessToken)
  }, [userState.data.user?._id, userState.data.accessToken])

  useEffect(() => {
    const getFollowings = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/${id}/followings`, token)
        setFollowings(res.data.followings)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      getFollowings(`${userState.data.user?._id}`, userState.data.accessToken)
  }, [userState.data.user?._id, userState.data.accessToken])

  useEffect(() => {
    const getUserPosts = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/posts/user/${id}`, token)
        setPosts(res.data.posts)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      getUserPosts(`${userState.data.user?._id}`, userState.data.accessToken)
  }, [userState.data.user?._id, userState.data.accessToken])

  return (
    <div className='bg-zinc-800 rounded-lg p-4'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 rounded-full'>
          {
            !userState.data.user?.avatar
            ? (
              <div className='bg-zinc-700 rounded-full w-full h-full flex items-center justify-center'>
                <p className='text-lg text-white font-semibold tracking-wide'>{`${userState.data.user?.name[0]}${userState.data.user?.name.split(' ')[userState.data.user?.name.split(' ').length - 1][0]}`}</p>
              </div>
            )
            : <img src={userState.data.user?.avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover border border-neutral-500 pointer-events-none' />
          }
        </div>
        <div>
          <h1 className='text-neutral-300 font-semibold mb-1'>{userState.data.user?.name}</h1>
          <p className='text-neutral-500 text-xs'>@{userState.data.user?.username}</p>
        </div>
      </div>
      <div className='w-full h-[1px] border-b border-zinc-700 mt-4' />
      <div className='flex items-center justify-between gap-6 mt-4'>
        <div className='flex items-center flex-col gap-1 flex-1'>
          <p className='text-lg text-neutral-300 font-bold'>{followers.length}</p>
          <p className='text-neutral-500 text-xs font-semibold'>Followers</p>
        </div>
        <div className='flex items-center flex-col gap-1 flex-1'>
          <p className='text-lg text-neutral-300 font-bold'>{followings.length}</p>
          <p className='text-neutral-500 text-xs font-semibold'>Followings</p>
        </div>
        <div className='flex items-center flex-col gap-1 flex-1'>
          <p className='text-lg text-neutral-300 font-bold'>{posts.length}</p>
          <p className='text-neutral-500 text-xs font-semibold'>Post</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverview
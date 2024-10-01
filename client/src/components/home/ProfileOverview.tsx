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
    <div className='border boder-gray-100 bg-white rounded-lg p-4'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 rounded-full'>
          {
            !userState.data.user?.avatar
            ? (
              <div className='bg-blue-500 rounded-full w-full h-full flex items-center justify-center'>
                <p className='text-2xl text-white font-semibold tracking-wide'>{`${userState.data.user?.name[0]}${userState.data.user?.name.split(' ')[userState.data.user?.name.split(' ').length - 1][0]}`}</p>
              </div>
            )
            : <img src={userState.data.user?.avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover border border-gray-500 pointer-events-none' />
          }
        </div>
        <div>
          <h1 className='font-semibold mb-1'>{userState.data.user?.name}</h1>
          <p className='text-gray-500 text-xs'>@{userState.data.user?.username}</p>
        </div>
      </div>
      <hr className='mt-4' />
      <div className='flex items-center justify-between gap-6 mt-4'>
        <div className='flex items-center flex-col gap-1 flex-1'>
          <p className='text-lg font-bold'>{followers.length}</p>
          <p className='text-gray-500 text-xs font-semibold'>Followers</p>
        </div>
        <div className='flex items-center flex-col gap-1 flex-1'>
          <p className='text-lg font-bold'>{followings.length}</p>
          <p className='text-gray-500 text-xs font-semibold'>Followings</p>
        </div>
        <div className='flex items-center flex-col gap-1 flex-1'>
          <p className='text-lg font-bold'>{posts.length}</p>
          <p className='text-gray-500 text-xs font-semibold'>Post</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverview
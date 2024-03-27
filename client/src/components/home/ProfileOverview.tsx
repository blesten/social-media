import { useState, useEffect } from 'react'
import { IFollow } from '../../utils/interface'
import useStore from './../../store/store'
import { getDataAPI } from '../../utils/fetchData'

const ProfileOverview = () => {
  const { userState } = useStore()
  const [followers, setFollowers] = useState<IFollow[]>([])
  const [followings, setFollowings] = useState<IFollow[]>([])

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

  return (
    <div className='border boder-gray-100 bg-white rounded-lg pb-3'>
      <div className='rounded-t-lg bg-blue-300 h-[100px] relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full w-24 h-24 bg-blue-500 flex justify-center items-center'>
          {
            !userState.data.user?.avatar
            ? <p className='text-4xl text-white font-semibold tracking-widest'>{`${userState.data.user?.name[0]}${userState.data.user?.name.split(' ')[userState.data.user?.name.split(' ').length - 1][0]}`}</p>
            : <img src={userState.data.user?.avatar} alt='Social Sphere' className='w-full h-full rounded-full object-cover' />
          }
        </div>
      </div>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='text-center'>
          <p className='text-lg mb-1 font-semibold'>{followers.length}</p>
          <p className='text-gray-500 text-xs'>Followers</p>
        </div>
        <div className='text-center'>
          <p className='text-lg mb-1 font-semibold'>{followings.length}</p>
          <p className='text-gray-500 text-xs'>Followings</p>
        </div>
      </div>
      <div className='text-center px-7 mt-1'>
        <h1 className='font-semibold mb-1'>{userState.data.user?.name}</h1>
        <p className='text-gray-500 text-xs'>@{userState.data.user?.username}</p>
        <p className='text-xs mt-4 leading-relaxed'>{userState.data.user?.description}</p>
      </div>
    </div>
  )
}

export default ProfileOverview
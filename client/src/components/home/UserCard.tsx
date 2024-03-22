import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from './../../utils/interface'
import useStore from './../../store/store'
import { patchDataAPI } from '../../utils/fetchData'

interface IProps {
  extraStyle?: string
  user?: IUser
  isAccept?: boolean
}

const UserCard: React.FC<IProps> = ({ extraStyle, user, isAccept }) => {
  const [followStatus, setFollowStatus] = useState('Follow')
  const [isAccepted, setIsAccepted] = useState(false)

  const navigate = useNavigate()

  const { userState, follow, unfollow } = useStore()

  const handleClickUser = () => {
    navigate(`/feeds/${user?._id}`)

    setTimeout(() => {
      window.location.reload()
    }, 1)
  }

  const handleClickFollow = async() => {
    if (!isAccept) {
      if (followStatus === 'Follow' || followStatus === 'Unfollow') {
        if (userState.followings.some(item => item.user._id === user?._id)) {
          await unfollow(user?._id!, userState.data.accessToken!)
        } else {
          await follow(user?._id!, userState.data.accessToken!)
        }
      }
    } else {
      if (!isAccepted) {
        try {
          await patchDataAPI(`/api/v1/users/${user?._id}/accept`, {}, userState.data.accessToken)
          setIsAccepted(true)
        } catch (err: any) {
          console.log(err.response.data.msg)
        }
      }
    }
  }

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
    <div className={`flex sm:flex-row flex-col sm:items-center sm:justify-between mb-4 ${extraStyle}`}>
      <div onClick={handleClickUser} className='flex items-center gap-4 cursor-pointer'>
        <div className='w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center'>
          {
            !user?.avatar && <p className='text-xl text-white font-semibold tracking-widest'>{`${user?.name[0]}${user?.name.split(' ')[user?.name.split(' ').length - 1][0]}`}</p>
          }
        </div>
        <div>
          <p className='font-semibold text-sm'>{user?.name}</p>
          <p className='text-xs text-gray-500'>@{user?.username}</p>
        </div>
      </div>
      {
        userState.data.user?._id !== user?._id &&
        <button onClick={handleClickFollow} className={`${!isAccepted && followStatus === 'Unfollow' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100 border border-blue-100' : !isAccepted && followStatus === 'Follow' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} text-xs sm:mt-0 mt-3 outline-none transition font-semibold rounded-md px-4 py-2`}>
          {!isAccept ? followStatus : isAccepted ? 'Accepted' : 'Accept'}
        </button>
      }
    </div>
  )
}

export default UserCard
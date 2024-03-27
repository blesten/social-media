import { useState, useEffect } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { IUser } from '../../utils/interface'
import { getDataAPI } from '../../utils/fetchData'
import useStore from './../../store/store'
import UserCard from './UserCard'

const RightContent = () => {
  const [users, setUsers] = useState<IUser[]>([])

  const { userState } = useStore()

  const fetchSimilarUsers = async() => {
    try {
      const res = await getDataAPI(`/api/v1/users/similar`, userState.data.accessToken)
      setUsers(res.data.similarUsers)
    } catch (err: any) {
      console.log(err.response.data.msg)
    }
  }

  useEffect(() => {
    const fetchSimilarUsers = async(token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/similar`, token)
        setUsers(res.data.similarUsers)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      fetchSimilarUsers(userState.data.accessToken)
  }, [userState.data.accessToken])

  return (
    <div className='xl:flex-1 xl:block hidden h-fit sticky top-28 px-8'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-blue-500'>People you might know</p>
        <IoMdRefresh onClick={fetchSimilarUsers} className='cursor-pointer' />
      </div>
      <div className='mt-7'>
        {
          users.map(item => (
            <UserCard
              key={item._id}
              user={item}
            />
          ))
        }
      </div>
    </div>
  )
}

export default RightContent
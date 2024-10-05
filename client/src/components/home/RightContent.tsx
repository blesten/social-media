import { useState, useEffect } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { IUser } from '../../utils/interface'
import { getDataAPI } from '../../utils/fetchData'
import useStore from './../../store/store'
import UserCard from './UserCard'
import Loader from '../general/Loader'
import { PiNoteBlankLight } from 'react-icons/pi'

const RightContent = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUser[]>([])

  const { userState } = useStore()

  const fetchSimilarUsers = async() => {
    try {
      setLoading(true)
      const res = await getDataAPI(`/api/v1/users/similar`, userState.data.accessToken)
      setUsers(res.data.similarUsers)
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      console.log(err.response.data.msg)
    }
  }

  useEffect(() => {
    const fetchSimilarUsers = async(token: string) => {
      try {
        setLoading(true)
        const res = await getDataAPI(`/api/v1/users/similar`, token)
        setUsers(res.data.similarUsers)
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      fetchSimilarUsers(userState.data.accessToken)
  }, [userState.data.accessToken])

  return (
    <div className='xl:flex-1 xl:block hidden h-fit sticky top-36 px-8'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-blue-500'>People you might know</p>
        <IoMdRefresh onClick={fetchSimilarUsers} className='cursor-pointer' />
      </div>
      <div className='mt-7'>
        {
          loading
          ? <Loader size='xl' />
          : (
            <>
              {
                users.length > 0
                ? (
                  <div className='bg-white rounded-md px-4 pt-4 pb-1 flex flex-col gap-2'>
                    {
                      users.map(item => (
                        <UserCard
                          key={item._id}
                          user={item}
                        />
                      ))
                    }
                  </div>
                )
                : (
                    <div className='flex flex-col items-center gap-3'>
                      <PiNoteBlankLight className='text-gray-300 text-8xl' />
                      <p className='text-sm text-gray-400 font-semibold'>Similar user is currently empty</p>
                    </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default RightContent
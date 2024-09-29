import { useState, useEffect } from 'react'
import { INotification } from './../../utils/interface'
import { PiNoteBlankLight } from 'react-icons/pi'
import { getDataAPI } from './../../utils/fetchData'
import LatestActivity from './LatestActivity'
import ProfileOverview from './ProfileOverview'
import useStore from './../../store/store'
import Loader from '../general/Loader'

const LeftContent = () => {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<INotification[]>([])

  const { userState } = useStore()

  useEffect(() => {
    const fetchNotifications = async(token: string) => {
      try {
        setLoading(true)
        const res = await getDataAPI(`/api/v1/notifications`, token)
        setNotifications(res.data.notifications)
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      fetchNotifications(userState.data.accessToken)
  }, [userState.data.accessToken])

  return (
    <div className='xl:flex-1 xl:block hidden h-fit sticky top-28 px-8'>
      <ProfileOverview />
      <div className='mt-7'>
        <p className='font-semibold text-blue-500'>Latest Activity</p>
        <div className='mt-4'>
          {
            loading
            ? <Loader size='xl' />
            : (
              <>
                {
                  notifications.length > 0
                  ? (
                    <div className='bg-white rounded-md px-4 pt-4 pb-1 flex flex-col gap-2'>
                      {
                        notifications.map(item => (
                          <LatestActivity
                            key={item._id}
                            avatar={item.avatar}
                            username={item.username}
                            message={item.message}
                            createdAt={item.createdAt}
                          />
                        ))
                      }
                    </div>
                  )
                  : (
                    <div className='flex flex-col items-center gap-3'>
                      <PiNoteBlankLight className='text-gray-300 text-8xl' />
                      <p className='text-sm text-gray-400 font-semibold'>Latest activity is currently empty</p>
                    </div>
                  )
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default LeftContent
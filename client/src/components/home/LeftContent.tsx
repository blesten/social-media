import { useState, useEffect } from 'react'
import { INotification } from './../../utils/interface'
import { getDataAPI } from './../../utils/fetchData'
import LatestActivity from './LatestActivity'
import ProfileOverview from './ProfileOverview'
import useStore from './../../store/store'

const LeftContent = () => {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const { userState } = useStore()

  useEffect(() => {
    const fetchNotifications = async(token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/notifications`, token)
        setNotifications(res.data.notifications)
      } catch (err: any) {
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
            notifications.length > 0
            ? (
              <>
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
              </>
            )
            : (
              <div className='bg-red-500 rounded-md text-sm text-white py-2 w-full text-center font-semibold'>
                <p>No latest activity found</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default LeftContent
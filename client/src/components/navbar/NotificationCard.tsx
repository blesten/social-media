import moment from 'moment'

interface IProps {
  username: string
  avatar: string
  message: string
  createdAt: string
}

const NotificationCard: React.FC<IProps> = ({ username, avatar, message, createdAt }) => {
  return (
    <div className='flex items-center justify-between p-3'>
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0'>
          {
            !avatar
            ? <p className='text-lg font-semibold tracking-widest uppercase text-white'>{`${username[0]}`}</p>
            : <img src={avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover' />
          }
        </div>
        <p className='text-sm'><strong>@{username}</strong> {message}</p>
      </div>
      <p className='text-xs text-gray-500'>{moment(createdAt).fromNow()}</p>
    </div>
  )
}

export default NotificationCard
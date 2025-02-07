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
        <div className='w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center shrink-0'>
          {
            !avatar
            ? <p className='font-semibold tracking-widest uppercase text-neutral-300'>{`${username[0]}`}</p>
            : <img src={avatar} alt='User Avatar' className='w-full h-full rounded-full object-cover' />
          }
        </div>
        <p className='text-sm text-neutral-300'><strong>@{username}</strong> {message}</p>
      </div>
      <p className='text-xs text-neutral-500'>{moment(createdAt).fromNow()}</p>
    </div>
  )
}

export default NotificationCard
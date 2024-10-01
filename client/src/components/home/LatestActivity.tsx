import moment from 'moment'

interface IProps {
  avatar: string
  username: string
  message: string
  createdAt: string
}

const LatestActivity: React.FC<IProps> = ({ avatar, username, message, createdAt }) => {
  return (
    <div className='flex items-center gap-3 mb-7'>
      <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shrink-0'>
        {
          !avatar
          ? <p className='text-xl font-semibold tracking-widest uppercase text-white'>{`${username[0]}`}</p>
          : <img src={avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover' />
        }
      </div>
      <div>
        <p className='text-sm'><strong>@{username}</strong> {message}</p>
        <p className='text-xs text-gray-400 mt-2'>{moment(createdAt).fromNow()}</p>
      </div>
    </div>
  )
}

export default LatestActivity
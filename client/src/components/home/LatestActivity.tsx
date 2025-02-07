import moment from 'moment'

interface IProps {
  avatar: string
  username: string
  message: string
  createdAt: string
  idx: number
  itemsLength: number
}

const LatestActivity: React.FC<IProps> = ({ avatar, username, message, createdAt, idx, itemsLength }) => {
  return (
    <div className={`flex items-center gap-3 ${idx === itemsLength - 1 ? 'mb-2' : 'mb-7'}`}>
      <div className='w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center shrink-0'>
        {
          !avatar
          ? <p className='text-xl font-semibold tracking-widest uppercase text-neutral-300'>{`${username[0]}`}</p>
          : <img src={avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover' />
        }
      </div>
      <div>
        <p className='text-sm text-neutral-300'><strong>@{username}</strong> {message}</p>
        <p className='text-xs text-neutral-500 mt-2'>{moment(createdAt).fromNow()}</p>
      </div>
    </div>
  )
}

export default LatestActivity
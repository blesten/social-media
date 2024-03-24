import { AiOutlineHeart } from 'react-icons/ai'
import { IComment } from '../../utils/interface'

interface IProps {
  comment?: IComment
}

const Comment: React.FC<IProps> = ({ comment }) => {
  return (
    <div className='flex md:flex-row flex-col md:items-center justify-between'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0'>
          {
            !comment?.user.avatar
            ? <p className='text-lg font-semibold tracking-widest'>{`${comment?.user.name[0]}${comment?.user.name.split(' ')[comment?.user.name.split(' ').length - 1][0]}`}</p>
            : <img src={comment.user.avatar} alt='Social Sphere' className='w-full h-full rounded-full object-cover' />
          }
        </div>
        <div>
          <p className='font-semibold'>{comment?.user.name}</p>
          <p className='text-xs mt-1'>{comment?.content}</p>
        </div>
      </div>
      <div className='flex items-center gap-1 md:mt-0 mt-4'>
        <AiOutlineHeart className='text-lg' />
        <p className='text-xs'>{comment?.likes.length}</p>
      </div>
    </div>
  )
}

export default Comment
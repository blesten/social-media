import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IComment } from './../../utils/interface'
import useStore from './../../store/store'
import { patchDataAPI } from '../../utils/fetchData'

interface IProps {
  comment?: IComment
  comments?: IComment[]
  setComments?: React.Dispatch<React.SetStateAction<IComment[]>>
}

const Comment: React.FC<IProps> = ({ comment, comments, setComments }) => {
  const { userState, initiate } = useStore()

  const handleLikeComment = async() => {
    try {
      await patchDataAPI(`/api/v1/comments/${comment?._id}/like`, {}, userState.data.accessToken)
      setComments!(comments?.map(item => item._id === comment?._id ? { ...item, likes: [ ...item.likes, userState.data.user?._id ] } : item) as IComment[])
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  const handleUnlikeComment = async() => {
    try {
      await patchDataAPI(`/api/v1/comments/${comment?._id}/unlike`, {}, userState.data.accessToken)
      setComments!(comments?.map(item => item._id === comment?._id ? { ...item, likes: item.likes.filter(u => u !== userState.data.user?._id) } : item) as IComment[])
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }
  
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
        {
          comment?.likes.includes(userState.data.user?._id as string)
          ? <AiFillHeart onClick={handleUnlikeComment} className='text-lg cursor-pointer text-red-500' />
          : <AiOutlineHeart onClick={handleLikeComment} className='text-lg cursor-pointer' />
        }
        <p className='text-xs'>{comment?.likes.length}</p>
      </div>
    </div>
  )
}

export default Comment
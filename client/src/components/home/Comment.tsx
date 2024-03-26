import { useState, useEffect, useRef } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IComment } from './../../utils/interface'
import { deleteDataAPI, patchDataAPI } from '../../utils/fetchData'
import { IoEllipsisVertical } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi' 
import { FaTrash } from 'react-icons/fa'
import useStore from './../../store/store'
import Delete from '../overlay/Delete'

interface IProps {
  comment?: IComment
  comments?: IComment[]
  setComments?: React.Dispatch<React.SetStateAction<IComment[]>>
}

const Comment: React.FC<IProps> = ({ comment, comments, setComments }) => {
  const { userState, initiate } = useStore()

  const [openMore, setOpenMore] = useState(false)
  const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false)

  const [selectedContent, setSelectedContent] = useState('')

  const openMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickDelete = () => {
    setOpenMore(false)
    setOpenDeleteOverlay(true)
  }

  const handleClickEdit = () => {
    setOpenMore(false)
    setSelectedContent(comment?.content!)
  }

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

  const handleDeleteComment = async() => {
    try {
      const res = await deleteDataAPI(`/api/v1/comments/${comment?._id}`, userState.data.accessToken)
      setComments!(comments?.filter(item => item._id !== comment?._id) as IComment[])
      initiate(res.data.msg, 'success')
      setOpenDeleteOverlay(false)
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  const handleUpdateComment = async() => {
    try {
      const res = await patchDataAPI(`/api/v1/comments/${comment?._id}`, { content: selectedContent }, userState.data.accessToken)
      setComments!(comments?.map(item => item._id === comment?._id ? { ...item, content: selectedContent } : item) as IComment[])
      initiate(res.data.msg, 'success')
      setSelectedContent('')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openMore && openMoreRef.current && !openMoreRef.current.contains(e.target as Node)) {
        setOpenMore(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openMore])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDeleteOverlay && deleteOverlayRef.current && !deleteOverlayRef.current.contains(e.target as Node)) {
        setOpenDeleteOverlay(false)
      }
    }
    
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDeleteOverlay])
  
  return (
    <>
      <div className='flex md:flex-row flex-col md:items-center justify-between gap-5'>
        <div className='flex items-center gap-4 flex-1'>
          <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0'>
            {
              !comment?.user.avatar
              ? <p className='text-lg font-semibold tracking-widest'>{`${comment?.user.name[0]}${comment?.user.name.split(' ')[comment?.user.name.split(' ').length - 1][0]}`}</p>
              : <img src={comment.user.avatar} alt='Social Sphere' className='w-full h-full rounded-full object-cover' />
            }
          </div>
          <div className='w-full'>
            <p className='font-semibold'>{comment?.user.name}</p>
            {
              selectedContent
              ? (
                <div className='mt-2'>
                  <input type='text' value={selectedContent} onChange={e => setSelectedContent(e.target.value)} className='w-full border border-gray-300 rounded-full outline-none h-9 text-sm px-3' />
                  <div className='flex items-center gap-4 text-sm mt-2'>
                    <p onClick={handleUpdateComment} className='text-blue-500 hover:text-blue-700 cursor-pointer font-semibold hover:underline'>Save</p>
                    <p onClick={() => setSelectedContent('')} className='cursor-pointer'>Cancel</p>
                  </div>
                </div>
              )
              : <p className='text-xs mt-1'>{comment?.content}</p>
            }
          </div>
        </div>
        <div className='flex items-center gap-1 md:mt-0 mt-4'>
          {
            comment?.likes.includes(userState.data.user?._id as string)
            ? <AiFillHeart onClick={handleUnlikeComment} className='text-lg cursor-pointer text-red-500' />
            : <AiOutlineHeart onClick={handleLikeComment} className='text-lg cursor-pointer' />
          }
          <p className='text-xs'>{comment?.likes.length}</p>
          {
            userState.data.user?._id === comment?.user._id &&
            <div className='relative'>
            <IoEllipsisVertical onClick={() => setOpenMore(true)} className='text-sm ml-2 cursor-pointer' />
              <div ref={openMoreRef} className={`absolute top-full right-0 bg-white shadow-md border border-gray-200 rounded-md w-[100px] mt-4 z-10 text-sm ${openMore ? 'scale-y-100' : 'scale-y-0'} transition origin-top`}>
                <div onClick={handleClickEdit} className='cursor-pointer flex items-center gap-3 border-b border-gray-200 p-2 hover:bg-gray-100 rounded-t-md transition'>
                  <FiEdit className='text-orange-500' />
                  <p>Update</p>
                </div>
                <div onClick={handleClickDelete} className='cursor-pointer flex items-center gap-3 border-b border-gray-200 p-2 hover:bg-gray-100 rounded-b-md transition'>
                  <FaTrash className='text-red-500' />
                  <p>Delete</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <Delete
        openDeleteOverlay={openDeleteOverlay}
        setOpenDeleteOverlay={setOpenDeleteOverlay}
        deleteOverlayRef={deleteOverlayRef}
        onSuccess={handleDeleteComment}
      />
    </>
  )
}

export default Comment
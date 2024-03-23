import { useState, useEffect, useRef } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { FaCaretLeft, FaCaretRight, FaCommentDots, FaRegBookmark, FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi' 
import { IUser } from './../../utils/interface'
import moment from 'moment'
import useStore from './../../store/store'
import Delete from './../overlay/Delete'
import Comment from './Comment'
import UpsertPost from '../overlay/UpsertPost'

interface IProps {
  id: string
  user: IUser
  caption: string
  images: string[]
  createdAt: string
  likes: string[]
}

const Post: React.FC<IProps> = ({ id, user, caption, images, createdAt, likes }) => {
  const [openMore, setOpenMore] = useState(false)
  const [openDeleteOverlay, setOpenDeleteOvelay] = useState(false)
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)

  const [currentPosition, setCurrentPosition] = useState(0)

  const openMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const { userState, likePost, unlikePost } = useStore()

  const handleChangeImage = (position: string) => {
    if (position === 'left') {
      const newIdx = currentPosition - 1

      if (newIdx < 0) {
        setCurrentPosition(0)
      } else {
        setCurrentPosition(newIdx)
      }
    } else if (position === 'right') {
      const newIdx = currentPosition + 1

      if (newIdx >= images.length) {
        setCurrentPosition(images.length - 1)
      } else {
        setCurrentPosition(newIdx)
      }
    }
  }

  const handleClickDelete = () => {
    setOpenMore(false)
    setOpenDeleteOvelay(true)
  }

  const handleClickEdit = () => {
    setOpenMore(false)
    setOpenUpsertPostOverlay(true)
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
        setOpenDeleteOvelay(false)
      }
    }
    
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDeleteOverlay])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openUpsertPostOverlay && upsertPostOverlayRef.current && !upsertPostOverlayRef.current.contains(e.target as Node)) {
        setOpenUpsertPostOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openUpsertPostOverlay])

  return (
    <>
      <div className='rounded-xl bg-white px-8 py-5 mb-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <div className='w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center'>
              {
                !user.avatar && <p className='text-2xl font-semibold tracking-widest text-white'>{`${user.name[0]}${user.name.split(' ')[user.name.split(' ').length - 1][0]}`}</p>
              }
            </div>
            <div>
              <h1 className='font-semibold'>{user.name}</h1>
              <p className='text-xs text-gray-500 mt-1'>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
          {
            user._id === userState.data.user?._id &&
            <div ref={openMoreRef} className='relative'>
              <div onClick={() => setOpenMore(!openMore)} className='cursor-pointer'>
                <IoEllipsisVerticalSharp />
              </div>
              <div className={`absolute bg-white w-[150px] shadow-md border border-gray-300 top-full mt-5 right-0 rounded-md ${openMore ? 'scale-y-100' : 'scale-y-0'} transition origin-top z-10`}>
                <div onClick={handleClickEdit} className='flex items-center gap-3 px-3 py-2 cursor-pointer rounded-t-md hover:bg-light-gray border-b border-gray-300'>
                  <FiEdit className='text-lg text-orange-500' />
                  <p>Edit</p>
                </div>
                <div onClick={handleClickDelete} className='flex items-center gap-3 px-3 py-2 cursor-pointer rounded-b-md hover:bg-light-gray'>
                  <FaTrash className='text-lg text-red-500' />
                  <p>Delete</p>
                </div>
              </div>
            </div>
          }
        </div>
        <div className='mt-6'>
          <p className='leading-relaxed text-justify'>{caption}</p>
          <div className='mt-5 relative'>
            <div className='w-full h-[300px] bg-gray-100 rounded-lg border border-gray-200'>
              <img src={images[currentPosition]} alt='Social Sphere' className='rounded-md w-full h-full object-contain pointer-events-none' />
            </div>
            {
              images.length > 1 &&
              <>
                <div onClick={() => handleChangeImage('left')} className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer'>
                  <FaCaretLeft />
                </div>
                <div onClick={() => handleChangeImage('right')} className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                  <FaCaretRight />
                </div>
              </>
            }
            <div className='flex absolute bottom-4 gap-2 left-1/2 -translate-x-1/2'>
              {
                images.length > 1 &&
                images.map((_, idx) => (
                  <div onClick={() => setCurrentPosition(idx)} className={`w-2 h-2 ${idx === currentPosition ? 'bg-gray-600' : 'bg-gray-300'} rounded-full shadow-md border border-gray-200 cursor-pointer`} />
                ))
              }
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between mt-5 gap-6'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-2'>
              {
                likes.includes(userState.data.user?._id as string)
                ? <AiFillHeart onClick={() => unlikePost(id, userState.data.user?._id as string, userState.data.accessToken as string)} className='text-lg cursor-pointer text-red-500' />
                : <AiOutlineHeart onClick={() => likePost(id, userState.data.user?._id as string, userState.data.accessToken as string)} className='text-lg cursor-pointer' />
              }
              <p className='text-sm'>{likes.length}</p>
            </div>
            <div className='flex items-center gap-2'>
              <FaCommentDots className='text-blue-500 text-lg' />
              <p className='text-sm'>550</p>
            </div>
          </div>
          <div className='md:block hidden relative rounded-full bg-gray-100 border border-gray-200 flex-1 h-10'>
            <input type='text' className='outline-none bg-transparent w-full px-4 h-10 text-sm' />
            <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400'>Write your comment</p>
          </div>
          <FaRegBookmark className='cursor-pointer' />
        </div>
        <div className='relative rounded-full bg-gray-100 border border-gray-200 flex-1 h-10 mt-5 md:hidden block'>
          <input type='text' className='outline-none bg-transparent w-full px-4 h-10 text-sm' />
          <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400'>Write your comment</p>
        </div>
        <hr className='my-5' />
        <div className='flex flex-col gap-8'>
          <Comment />
          <Comment />
          <p className='text-xs text-center text-gray-400 cursor-pointer'>Load more comments</p>
        </div>
      </div>

      <Delete
        openDeleteOverlay={openDeleteOverlay}
        setOpenDeleteOverlay={setOpenDeleteOvelay}
        deleteOverlayRef={deleteOverlayRef}
      />

      <UpsertPost
        openUpsertPostOverlay={openUpsertPostOverlay}
        setOpenUpsertPostOverlay={setOpenUpsertPostOverlay}
        upsertPostOverlayRef={upsertPostOverlayRef}
      />
    </>
  )
}

export default Post
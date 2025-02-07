import { useState, useEffect, useRef } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { FaBookmark, FaCaretLeft, FaCaretRight, FaCommentDots, FaRegBookmark, FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi' 
import { FormSubmitted, IComment, IPost, IUser } from './../../utils/interface'
import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
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
  const [selectedPost, setSelectedPost] = useState<Partial<IPost>>({})
  const [commentLimit, setCommentLimit] = useState(3)

  const [currentPosition, setCurrentPosition] = useState(0)

  const [isSaved, setIsSaved] = useState(false)

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<IComment[]>([])

  const openMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const { userState, initiate, likePost, unlikePost, deletePost } = useStore()

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

  const handleLoadMoreComments = () => {
    setCommentLimit(commentLimit + 3)
  }

  const handleHideComments = () => {
    setCommentLimit(3)
  }

  const handleUnsavedPost = async() => {
    try {
      await patchDataAPI(`/api/v1/posts/${id}/unsave`, {}, userState.data.accessToken)
      setIsSaved(false)
    } catch (err: any) {
      console.log(err.response.data.msg)
    }
  }

  const handleSavedPost = async() => {
    try {
      await patchDataAPI(`/api/v1/posts/${id}/save`, {}, userState.data.accessToken)
      setIsSaved(true)
    } catch (err: any) {
      console.log(err.response.data.msg)
    }
  }

  const handlePostComment = async(e: FormSubmitted) => {
    e.preventDefault()
    try {
      const res = await postDataAPI(`/api/v1/comments?postId=${id}`, {
        content: comment
      }, userState.data.accessToken)

      setComments([ { ...res.data.comment, user: userState.data.user }, ...comments ])
      setComment('')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  const handleClickDelete = () => {
    setOpenMore(false)
    setOpenDeleteOvelay(true)
  }

  const handleDeletePost = async() => {
    await deletePost(id, userState.data.accessToken!)
  }

  const handleClickEdit = () => {
    setOpenMore(false)
    setSelectedPost({ _id: id, caption, images })
    setOpenUpsertPostOverlay(true)
  }

  useEffect(() => {
    const getSavedStatus = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/posts/${id}/savedStatus`, token)
        setIsSaved(res.data.savedStatus)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      getSavedStatus(id, userState.data.accessToken)
  }, [id, userState.data.accessToken])

  useEffect(() => {
    const getPostComments = async(id: string) => {
      try {
        const res = await getDataAPI(`/api/v1/comments?postId=${id}`)
        setComments(res.data.comments)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    getPostComments(id)
  }, [id])

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
        setSelectedPost({})
        setOpenUpsertPostOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openUpsertPostOverlay])

  return (
    <>
      <div className='rounded-xl bg-zinc-800 px-8 py-5 mb-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <div className='w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center'>
              {
                !user.avatar
                ? <p className='text-neutral-300 font-semibold tracking-widest'>{`${user.name[0]}${user.name.split(' ')[user.name.split(' ').length - 1][0]}`}</p>
                : <img src={user.avatar} alt='Byte Craft Studio - Social Media' className='w-full h-full rounded-full object-cover' />
              }
            </div>
            <div>
              <h1 className='text-neutral-300 font-semibold'>{user.name}</h1>
              <p className='text-xs text-neutral-500 mt-1'>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
          {
            user._id === userState.data.user?._id &&
            <div ref={openMoreRef} className='relative'>
              <div onClick={() => setOpenMore(!openMore)} className='cursor-pointer'>
                <IoEllipsisVerticalSharp className='text-neutral-300' />
              </div>
              <div className={`absolute bg-zinc-700 w-[150px] shadow-md top-full mt-5 right-0 rounded-md ${openMore ? 'scale-y-100' : 'scale-y-0'} transition origin-top z-10`}>
                <div onClick={handleClickEdit} className='flex items-center gap-3 px-3 py-2 cursor-pointer rounded-t-md hover:bg-neutral-500 border-b border-neutral-600'>
                  <p className='text-neutral-300 text-sm'>Edit</p>
                </div>
                <div onClick={handleClickDelete} className='flex items-center gap-3 px-3 py-2 cursor-pointer rounded-b-md hover:bg-neutral-500'>
                  <p className='text-neutral-300 text-sm'>Delete</p>
                </div>
              </div>
            </div>
          }
        </div>
        <div className='mt-6'>
          <p className='leading-relaxed text-neutral-300 text-justify'>{caption}</p>
          <div className='mt-5 relative'>
            <div className='w-full h-[300px] bg-gray-100 rounded-lg border border-neutral-600'>
              <img src={images[currentPosition]} alt='Byte Craft Studio - Social Media' className='rounded-md w-full h-full object-cover pointer-events-none' />
            </div>
            {
              images.length > 1 &&
              <>
                {
                  currentPosition !== 0 &&
                  <div onClick={() => handleChangeImage('left')} className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer'>
                    <FaCaretLeft />
                  </div>
                }

                {
                  currentPosition !== images.length - 1 &&
                  <div onClick={() => handleChangeImage('right')} className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                    <FaCaretRight />
                  </div>
                }
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
                : <AiOutlineHeart onClick={() => likePost(id, userState.data.user?._id as string, userState.data.accessToken as string)} className='text-lg text-neutral-500 cursor-pointer' />
              }
              <p className='text-neutral-300 text-sm'>{likes.length}</p>
            </div>
            <div className='flex items-center gap-2'>
              <FaCommentDots className='text-neutral-500 text-lg' />
              <p className='text-neutral-300 text-sm'>{comments.length}</p>
            </div>
          </div>
          <form onSubmit={handlePostComment} className='md:block hidden relative rounded-full bg-zinc-700 border border-neutral-600 flex-1 h-10'>
            <input type='text' value={comment} onChange={e => setComment(e.target.value)} className='outline-none text-neutral-300 bg-transparent w-full px-4 h-10 text-sm' />
            {
              !comment &&
              <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-neutral-500 pointer-events-none'>Write your comment</p>
            }
          </form>
          {
            isSaved
            ? <FaBookmark onClick={handleUnsavedPost} className='cursor-pointer text-blue-500' />
            : <FaRegBookmark onClick={handleSavedPost} className='cursor-pointer text-neutral-500' />
          }
        </div>
        <form onSubmit={handlePostComment} className='relative rounded-full bg-zinc-700 border border-neutral-600 flex-1 h-10 mt-5 md:hidden block'>
          <input type='text' value={comment} onChange={e => setComment(e.target.value)} className='outline-none bg-transparent text-neutral-300 w-full px-4 h-10 text-sm' />
          {
            !comment &&
            <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-neutral-500 pointer-events-none'>Write your comment</p>
          }
        </form>
        <div className='my-5 border-b border-neutral-700 w-full h-[1px]' />
        <div className='flex flex-col gap-8'>
          {
            comments.length > 0
            ? (
              <>
                {
                  comments.slice(0, commentLimit).map((item, idx) => (
                    <Comment
                      key={idx}
                      comment={item}
                      comments={comments}
                      setComments={setComments}
                    />
                  ))
                }
              </>
            )
            : (
              <div>
                <p className='text-center text-sm text-neutral-500'>Comment is empty</p>
              </div>
            )
          }

          {
            comments.length > commentLimit &&
            <p onClick={handleLoadMoreComments} className='text-xs text-center text-neutral-500 cursor-pointer'>Load more comments</p>
          }

          {
            (comments.length > 3 && commentLimit > 3 && comments.length < commentLimit) &&
            <p onClick={handleHideComments} className='text-xs text-center text-neutral-500 cursor-pointer'>Hide comments</p>
          }
        </div>
      </div>

      <Delete
        openDeleteOverlay={openDeleteOverlay}
        setOpenDeleteOverlay={setOpenDeleteOvelay}
        deleteOverlayRef={deleteOverlayRef}
        onSuccess={handleDeletePost}
      />

      <UpsertPost
        openUpsertPostOverlay={openUpsertPostOverlay}
        setOpenUpsertPostOverlay={setOpenUpsertPostOverlay}
        upsertPostOverlayRef={upsertPostOverlayRef}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </>
  )
}

export default Post
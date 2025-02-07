import { useState, useEffect, useRef } from 'react'
import { AiFillHeart, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai'
import { FaBookmark, FaCaretLeft, FaCaretRight, FaCommentDots, FaRegBookmark, FaTrash } from 'react-icons/fa'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import { FormSubmitted, IComment, IPost } from '../../utils/interface'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import Comment from './../home/Comment'
import Delete from './Delete'
import UpsertPost from './UpsertPost'
import useStore from './../../store/store'
import moment from 'moment'

interface IProps {
  openPostOverlay: boolean
  setOpenPostOverlay: React.Dispatch<React.SetStateAction<boolean>>
  postOverlayRef: React.MutableRefObject<HTMLDivElement>
  post: IPost
  comments: IComment[]
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>
  likes: string[]
  setLikes: React.Dispatch<React.SetStateAction<string[]>>
  posts: IPost[]
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}

const Post: React.FC<IProps> = ({ openPostOverlay, setOpenPostOverlay, postOverlayRef, post, comments, setComments, likes, setLikes, posts, setPosts }) => {
  const [openMore, setOpenMore] = useState(false)
  const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false)
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [selectedPost, setSelectedPost] = useState<Partial<IPost>>({})

  const [isSaved, setIsSaved] = useState(false)

  const [comment, setComment] = useState('')

  const openMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const { userState, initiate } = useStore()

  const handleClickEdit = () => {
    setOpenPostOverlay(false)
    setSelectedPost({ _id: post._id, caption: post.caption, images: post.images })
    setOpenUpsertPostOverlay(true)
  }

  const handleClickDelete = () => {
    setOpenPostOverlay(false)
    setOpenDeleteOverlay(true)
  }

  const handleDeletePost = async() => {
    try {
      const res = await deleteDataAPI(`/api/v1/posts/${post._id}`, userState.data.accessToken)
      setPosts(posts.filter(item => item._id !== post._id))
      initiate(res.data.msg, 'success')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  const handleUnsavedPost = async() => {
    try {
      await patchDataAPI(`/api/v1/posts/${post._id}/unsave`, {}, userState.data.accessToken)
      setIsSaved(false)
    } catch (err: any) {
      console.log(err.response.data.msg)
    }
  }

  const handleSavedPost = async() => {
    try {
      await patchDataAPI(`/api/v1/posts/${post._id}/save`, {}, userState.data.accessToken)
      setIsSaved(true)
    } catch (err: any) {
      console.log(err.response.data.msg)
    }
  }

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

      if (newIdx >= post.images.length) {
        setCurrentPosition(post.images.length - 1)
      } else {
        setCurrentPosition(newIdx)
      }
    }
  }

  const handleLikePost = async() => {
    try {
      await patchDataAPI(`/api/v1/posts/${post._id}/like`, {}, userState.data.accessToken)
      setLikes([ ...likes, userState.data.user!._id ])
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  const handleUnlikePost = async() => {
    try {
      await patchDataAPI(`/api/v1/posts/${post._id}/unlike`, {}, userState.data.accessToken)
      setLikes(likes.filter(item => item !== userState.data.user?._id))
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
  }

  const handlePostComment = async(e: FormSubmitted) => {
    e.preventDefault()
    try {
      const res = await postDataAPI(`/api/v1/comments?postId=${post._id}`, {
        content: comment
      }, userState.data.accessToken)

      setComments([ { ...res.data.comment, user: userState.data.user }, ...comments ])
      setComment('')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }
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
      getSavedStatus(post._id, userState.data.accessToken)
  }, [post._id, userState.data.accessToken])

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
      <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] z-20 flex items-center justify-center ${openPostOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition px-10`}>
        <div ref={postOverlayRef} className={`lg:w-2/3 w-full rounded-md bg-zinc-800 h-[90vh] flex md:flex-row flex-col ${openPostOverlay ? 'translate-y-0 ' : '-translate-y-16'} transition overflow-auto`}>
          <div className='flex-1 flex flex-col border-r border-neutral-600'>
            <div className='flex-1 relative bg-zinc-600'>
              <div className='w-full h-full'>
                <img src={post.images[currentPosition]} alt='Post Image' className='w-full h-full rounded-tl-md md:rounded-tr-none rounded-tr-md pointer-events-none object-cover' />
              </div>
              <div>
                {
                  post.images.length > 1 &&
                  <>
                    {
                      currentPosition !== 0 &&
                      <div onClick={() => handleChangeImage('left')} className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer'>
                        <FaCaretLeft />
                      </div>
                    }

                    {
                      currentPosition !== post.images.length - 1 &&
                      <div onClick={() => handleChangeImage('right')} className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                        <FaCaretRight />
                      </div>
                    }
                  </>
                }
              </div>
            </div>
            <div className='flex items-center justify-between py-4 px-5'>
              <div className='flex items-center gap-7'>
                <div className='flex items-center gap-2'>
                  {
                    likes.includes(userState.data.user?._id as string)
                    ? <AiFillHeart onClick={handleUnlikePost} className='text-xl cursor-pointer text-red-500' />
                    : <AiOutlineHeart onClick={handleLikePost} className='text-xl text-neutral-500 cursor-pointer' />
                  }
                  <p className='text-neutral-300 font-semibold'>{likes.length}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <FaCommentDots className='text-neutral-500 text-lg' />
                  <p className='text-neutral-300 text-sm'>{comments.length}</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                {
                  isSaved
                  ? <FaBookmark onClick={handleUnsavedPost} className='cursor-pointer text-blue-500' />
                  : <FaRegBookmark onClick={handleSavedPost} className='text-neutral-500 cursor-pointer' />
                }
                
                {
                  userState.data.user?._id === post.user._id &&
                  <div ref={openMoreRef} className='relative'>
                    <IoEllipsisVerticalSharp onClick={() => setOpenMore(!openMore)} className='text-neutral-500 cursor-pointer' />
                    <div className={`absolute bottom-full right-0 mb-5 bg-zinc-600 rounded-md w-[150px] ${openMore ? 'scale-y-100' : 'scale-y-0'} transition origin-bottom`}>
                      <div onClick={handleClickEdit} className='flex items-center gap-3 px-3 py-2 cursor-pointer rounded-t-md text-neutral-300 hover:bg-zinc-500 border-b border-neutral-500'>
                        <p>Edit</p>
                      </div>
                      <div onClick={handleClickDelete} className='flex items-center gap-3 px-3 py-2 cursor-pointer rounded-b-md text-neutral-300 hover:bg-zinc-500'>
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col'>
            <div className='flex items-center justify-between border-b border-neutral-600 px-5 py-3 text-neutral-300'>
              <h1 className='font-semibold'>Comments</h1>
              <AiOutlineClose onClick={() => setOpenPostOverlay(false)} className='md:block hidden cursor-pointer' />
            </div>
            <div className='flex-1 overflow-auto p-5 hide-scrollbar flex flex-col gap-5'>
              <div className='border-b border-neutral-600 pb-4 text-sm flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                  <div className='w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-500 text-neutral-300'>
                    {
                      !post.user.avatar
                      ? <p className='font-semibold tracking-widest'>{`${post.user.name[0]}${post.user.name.split(' ')[post.user.name.split(' ').length - 1][0]}`}</p>
                      : <img src={post.user.avatar} alt='User Avatar' className='w-full h-full rounded-full object-cover' />
                    }
                  </div>
                  <p className='text-neutral-300'>{post.caption}</p>
                </div>
                <p className='text-xs text-neutral-500'>{moment(post.createdAt).fromNow()}</p>
              </div>
              {
                comments.map((item, idx) => (
                  <Comment
                    key={idx}
                    comment={item}
                    comments={comments}
                    setComments={setComments}
                  />
                ))
              }
            </div>
            <div className='border-t border-neutral-600 py-4 px-5'>
              <form onSubmit={handlePostComment} className='relative rounded-full bg-neutral-600 border border-neutral-500 text-neutral-300 h-10'>
                <input type='text' value={comment} onChange={e => setComment(e.target.value)} className='outline-none bg-transparent w-full px-4 h-10 text-sm' />
                {
                  !comment &&
                  <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400 pointer-events-none'>Write your comment</p>
                }
              </form>
            </div>
          </div>
        </div>
      </div>

      <Delete
        openDeleteOverlay={openDeleteOverlay}
        setOpenDeleteOverlay={setOpenDeleteOverlay}
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
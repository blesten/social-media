import { useState, useEffect, useRef } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { IComment, IPost } from '../../utils/interface'
import Post from '../overlay/Post'
import { getDataAPI } from '../../utils/fetchData'

interface IProps {
  post: IPost
  posts: IPost[]
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}

const PostCard: React.FC<IProps> = ({ post, posts, setPosts }) => {
  const [openPostOverlay, setOpenPostOverlay] = useState(false)
  const [likes, setLikes] = useState<string[]>([])
  const [comments, setComments] = useState<IComment[]>([])

  const postOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const getPostComments = async(id: string) => {
      try {
        const res = await getDataAPI(`/api/v1/comments?postId=${id}`)
        setComments(res.data.comments)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    getPostComments(post._id)
  }, [post._id])

  useEffect(() => {
    setLikes(post.likes)
  }, [post.likes])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openPostOverlay && postOverlayRef.current && !postOverlayRef.current.contains(e.target as Node)) {
        setOpenPostOverlay(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openPostOverlay])

  return (
    <>
      <div onClick={() => setOpenPostOverlay(true)} className='group w-64 h-64 bg-gray-200 rounded-lg cursor-pointer relative shadow-lg border border-neutral-600'>
        <img src={post.images[0]} alt='Post Image' className='rounded-md w-full h-full object-cover pointer-events-none cursor-pointer' />
        <div className='absolute top-0 left-0 w-full h-full rounded-md bg-[rgba(0,0,0,.6)] flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100 transition'>
          <div className='text-white flex items-center gap-2'>
            <AiOutlineHeart className='text-2xl' />
            <p className='text-lg font-semibold'>{likes.length}</p>
          </div>
          <div className='text-white flex items-center gap-2'>
            <FaRegCommentDots className='text-xl' />
            <p className='text-lg font-semibold'>{comments.length}</p>
          </div>
        </div>
      </div>

      <Post
        openPostOverlay={openPostOverlay}
        setOpenPostOverlay={setOpenPostOverlay}
        postOverlayRef={postOverlayRef}
        post={post}
        comments={comments}
        setComments={setComments}
        likes={likes}
        setLikes={setLikes}
        posts={posts}
        setPosts={setPosts}
      />
    </>
  )
}

export default PostCard
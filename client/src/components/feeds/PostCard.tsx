import { useState, useEffect, useRef } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import Post from '../overlay/Post'

interface IProps {
  thumbnail: string
}

const PostCard: React.FC<IProps> = ({ thumbnail }) => {
  const [openPostOverlay, setOpenPostOverlay] = useState(false)

  const postOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

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
      <div onClick={() => setOpenPostOverlay(true)} className='group w-64 h-64 bg-gray-200 rounded-lg cursor-pointer relative shadow-lg border border-gray-300'>
        <img src={thumbnail} alt='Social Sphere' className='rounded-md w-full h-full object-contain border border-gray-200 pointer-events-none cursor-pointer' />
        <div className='absolute top-0 left-0 w-full h-full rounded-md bg-[rgba(0,0,0,.6)] flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100 transition'>
          <div className='text-white flex items-center gap-2'>
            <AiOutlineHeart className='text-2xl' />
            <p className='text-lg font-semibold'>15K</p>
          </div>
          <div className='text-white flex items-center gap-2'>
            <FaRegCommentDots className='text-xl' />
            <p className='text-lg font-semibold'>15K</p>
          </div>
        </div>
      </div>

      <Post
        openPostOverlay={openPostOverlay}
        setOpenPostOverlay={setOpenPostOverlay}
        postOverlayRef={postOverlayRef}
      />
    </>
  )
}

export default PostCard
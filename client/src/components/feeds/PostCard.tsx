import { useState, useEffect, useRef } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import Post from '../overlay/Post'

const PostCard = () => {
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
      <div onClick={() => setOpenPostOverlay(true)} className='group w-64 h-64 bg-gray-200 rounded-lg cursor-pointer relative'>
        <img src='https://img.freepik.com/free-photo/view-3d-car_23-2150796904.jpg?t=st=1709814981~exp=1709818581~hmac=2e85b762ccf775937a2bfe0dcf70f541f99e5bc232b1af989c1a64e6e05da9e8&w=740' alt='Social Sphere' className='rounded-md w-full h-full object-cover border border-gray-200 pointer-events-none cursor-pointer' />
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
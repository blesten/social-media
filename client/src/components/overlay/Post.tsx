import { useState, useEffect, useRef } from 'react'
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai'
import { FaCommentDots, FaRegBookmark, FaTrash } from 'react-icons/fa'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import Comment from './../home/Comment'
import Delete from './Delete'
import UpsertPost from './UpsertPost'

interface IProps {
  openPostOverlay: boolean
  setOpenPostOverlay: React.Dispatch<React.SetStateAction<boolean>>
  postOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const Post: React.FC<IProps> = ({ openPostOverlay, setOpenPostOverlay, postOverlayRef }) => {
  const [openMore, setOpenMore] = useState(false)
  const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false)
  const [openUpsertPostOverlay, setOpenUpsertPostOverlay] = useState(false)

  const openMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const deleteOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const upsertPostOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickEdit = () => {
    setOpenPostOverlay(false)
    setOpenUpsertPostOverlay(true)
  }

  const handleClickDelete = () => {
    setOpenPostOverlay(false)
    setOpenDeleteOverlay(true)
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
        <div ref={postOverlayRef} className={`lg:w-2/3 w-full rounded-md bg-white h-[90vh] flex md:flex-row flex-col ${openPostOverlay ? 'translate-y-0 ' : '-translate-y-16'} transition overflow-auto`}>
          <div className='flex-1 flex flex-col border-r border-gray-200'>
            <div className='flex-1'>
              <img src='https://img.freepik.com/free-photo/view-3d-car_23-2150796904.jpg?t=st=1709814981~exp=1709818581~hmac=2e85b762ccf775937a2bfe0dcf70f541f99e5bc232b1af989c1a64e6e05da9e8&w=740' alt='Social Sphere' className='w-full h-full rounded-tl-md md:rounded-tr-none rounded-tr-md pointer-events-none' />
            </div>
            <div className='flex items-center justify-between py-4 px-5'>
              <div className='flex items-center gap-7'>
                <div className='flex items-center gap-2'>
                  <AiOutlineHeart className='text-xl' />
                  <p className='font-semibold'>15K</p>
                </div>
                <div className='flex items-center gap-2'>
                  <FaCommentDots className='text-blue-500 text-lg' />
                  <p className='text-sm'>550</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <FaRegBookmark />
                <div ref={openMoreRef} className='relative'>
                  <IoEllipsisVerticalSharp onClick={() => setOpenMore(!openMore)} className='cursor-pointer' />
                  <div className={`absolute bottom-full right-0 mb-5 bg-white rounded-md w-[150px] border border-gray-300 shadow-md ${openMore ? 'scale-y-100' : 'scale-y-0'} transition origin-bottom`}>
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
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col'>
            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
              <h1 className='font-semibold'>Comments</h1>
              <AiOutlineClose onClick={() => setOpenPostOverlay(false)} className='cursor-pointer' />
            </div>
            <div className='flex-1 overflow-auto p-5 hide-scrollbar flex flex-col gap-5'>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
            <div className='border-t border-gray-200 py-4 px-5'>
              <div className='relative rounded-full bg-gray-100 border border-gray-200 h-10'>
                <input type='text' className='outline-none bg-transparent w-full px-4 h-10 text-sm' />
                <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400'>Write your comment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Delete
        openDeleteOverlay={openDeleteOverlay}
        setOpenDeleteOverlay={setOpenDeleteOverlay}
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
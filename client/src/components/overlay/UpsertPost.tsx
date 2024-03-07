import { useState, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdFileUpload } from 'react-icons/md'
import { FormChanged } from '../../utils/interface'

interface IProps {
  openUpsertPostOverlay: boolean
  setOpenUpsertPostOverlay: React.Dispatch<React.SetStateAction<boolean>>
  upsertPostOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const UpsertPost: React.FC<IProps> = ({ openUpsertPostOverlay, setOpenUpsertPostOverlay, upsertPostOverlayRef }) => {
  const [posts, setPosts] = useState<File[]>([])

  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (idx: number) => {
    const newPosts = [...posts]
    newPosts.splice(idx, 1)
    setPosts(newPosts)
  }

  const handleChangeImages = (e: FormChanged) => {
    const target = e.target as HTMLInputElement
    const files = [...Object.values(target.files!)]
    setPosts([...posts, ...files])
  }

  return (
    <div className={`z-20 fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] ${openUpsertPostOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition flex items-center justify-center`}>
      <div ref={upsertPostOverlayRef} className={`w-1/3 bg-white rounded-md ${openUpsertPostOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
          <h1 className='font-semibold'>Create Post</h1>
          <AiOutlineClose onClick={() => setOpenUpsertPostOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='px-5 py-3'>
          {
            posts.length < 1
            ? (
              <div className='w-full h-[250px] bg-gray-200 rounded-md flex items-center justify-center flex-col'>
                <MdFileUpload className='text-gray-300 text-9xl' />
                <p className='text-sm font-semibold text-gray-500'><span onClick={handleClickUpload} className='underline text-blue-500 cursor-pointer'>Upload</span> images/videos from device</p>
                <input type='file' ref={fileInputRef} onChange={handleChangeImages} className='hidden pointer-events-none' accept='image/*' multiple />
              </div>
            )
            : (
              <>
                <div className='w-full h-[250px] bg-gray-100 rounded-md grid grid-cols-4 gap-5 p-4 overflow-y-auto hide-scrollbar'>
                  {
                    posts.map((item, idx) => (
                      <div className='relative'>
                        <img src={URL.createObjectURL(item)} alt='Social Sphere' className='w-24 h-24 rounded-md object-cover' />
                        <div onClick={() => handleRemoveImage(idx)} className='text-white bg-red-500 rounded-full w-5 font-semibold h-5 flex items-center justify-center text-xs -top-2 -right-2 absolute outline outline-white outline-2 cursor-pointer'>
                          <AiOutlineClose />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <input type='file' ref={fileInputRef} onChange={handleChangeImages} className='hidden pointer-events-none' accept='image/*' multiple />
                <p onClick={handleClickUpload} className='underline text-xs mt-2 w-fit text-blue-500 cursor-pointer'>Upload</p>
              </>
            )
          }
          <div className='mt-5'>
            <label htmlFor='caption' className='text-sm'>Caption</label>
            <textarea name='caption' id='caption' className='w-full resize-none border border-gray-300 rounded-md h-24 outline-none text-sm p-3 mt-2' />
          </div>  
          <button className='mt-4 bg-blue-500 rounded-full text-white text-sm font-semibold py-2 w-full hover:bg-blue-600 transition outline-none'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default UpsertPost
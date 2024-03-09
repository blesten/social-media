import { useState, useRef } from 'react'
import { AiFillCamera, AiOutlineClose } from 'react-icons/ai'
import { FormChanged } from '../../utils/interface'

interface IProps {
  openEditProfileOverlay: boolean
  setOpenEditProfileOverlay: React.Dispatch<React.SetStateAction<boolean>>
  editProfileOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const EditProfile: React.FC<IProps> = ({ openEditProfileOverlay, setOpenEditProfileOverlay, editProfileOverlayRef }) => {
  const [tempAvatar, setTempAvatar] = useState<File>()

  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleClickUpload = () => {
    fileInputRef.current.click()
  }

  const handleChangeAvatar = (e: FormChanged) => {
    const target = e.target as  HTMLInputElement
    const files = [...Object.values(target.files!)]
    setTempAvatar(files[0])
  }

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] z-30 transition ${openEditProfileOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex items-center justify-center px-12`}>
      <div ref={editProfileOverlayRef} className={`bg-white rounded-md xl:w-1/3 lg:w-1/2 w-full`}>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
          <h1 className='font-semibold'>Edit Profile</h1>
          <AiOutlineClose onClick={() => setOpenEditProfileOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='px-5 py-3'>
          <div className='group w-24 h-24 rounded-full bg-gray-200 m-auto mb-5 relative cursor-pointer border border-gray-300 shadow-md'>
            {
              tempAvatar &&
              <img src={URL.createObjectURL(tempAvatar)} alt='Social Sphere' className='w-full h-full rounded-full object-cover' />
            }
            <div onClick={handleClickUpload} className='absolute top-0 left-0 rounded-full w-full h-full flex items-center justify-center bg-[rgba(0,0,0,.6)] group-hover:opacity-100 opacity-0 transition'>
              <AiFillCamera className='text-5xl text-white' />
            </div>
            <input type='file' className='hidden' ref={fileInputRef} accept='image/*' onChange={handleChangeAvatar} />
          </div>
          <div className='mb-5'>
            <label htmlFor='name' className='text-sm'>Name</label>
            <input type='text' id='name' name='name' className='outline-none w-full border border-gray-300 rounded-md px-2 py-3 text-sm mt-2' />
          </div>
          <div className='mb-5'>
            <label htmlFor='username' className='text-sm'>Username</label>
            <input type='text' id='username' name='username' className='outline-none w-full border border-gray-300 rounded-md px-2 py-3 text-sm mt-2' />
          </div>
          <div className='mb-5'>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input type='text' id='email' name='email' className='outline-none w-full border border-gray-300 rounded-md px-2 py-3 text-sm mt-2 bg-gray-100' readOnly />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='text-sm'>Description</label>
            <textarea id='description' name='description' className='outline-none w-full resize-none border border-gray-300 rounded-md text-sm px-2 py-3 mt-2' />
          </div>
          <button className='bg-blue-500 text-white text-sm rounded-md w-full py-2 font-semibold transition hover:bg-blue-600'>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
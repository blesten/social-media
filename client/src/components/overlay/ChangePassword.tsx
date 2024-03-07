import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai'
import { FormChanged } from '../../utils/interface'

interface IProps {
  openChangePasswordOverlay: boolean
  setOpenChangePasswordOverlay: React.Dispatch<React.SetStateAction<boolean>>
  changePasswordOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const ChangePassword: React.FC<IProps> = ({ openChangePasswordOverlay, setOpenChangePasswordOverlay, changePasswordOverlayRef }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false)

  const handleChange = (e: FormChanged) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20 ${openChangePasswordOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition`}>
      <div ref={changePasswordOverlayRef} className={`bg-white transition rounded-md ${openChangePasswordOverlay ? 'translate-y-0' : '-translate-y-16'} w-1/3`}>
        <div className='px-5 py-3 border-b border-gray-300 flex items-center justify-between'>
          <p className='font-semibold'>Change Password</p>
          <AiOutlineClose onClick={() => setOpenChangePasswordOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='px-5 py-3'>
          <div className='mb-5'>
            <label htmlFor='currentPassword' className='text-sm'>Current Password</label>
            <div className='border border-gray-300 rounded-md p-3 mt-2 flex items-center justify-between'>
              <input type={showCurrentPassword ? 'text' : 'password'} id='currentPassword' name='currentPassword' onChange={handleChange} className='outline-none text-sm w-full' />
              {
                showCurrentPassword
                ? <AiFillEyeInvisible onClick={() => setShowCurrentPassword(false)} className='text-gray-500 cursor-pointer' />
                : <AiFillEye onClick={() => setShowCurrentPassword(true)} className='text-gray-500 cursor-pointer' />
              }
            </div>
          </div>
          <div className='mb-5'>
            <label htmlFor='newPassword' className='text-sm'>New Password</label>
            <div className='border border-gray-300 rounded-md p-3 mt-2 flex items-center justify-between'>
              <input type={showNewPassword ? 'text' : 'password'} id='newPassword' name='newPassword' onChange={handleChange} className='outline-none text-sm w-full' />
              {
                showNewPassword
                ? <AiFillEyeInvisible onClick={() => setShowNewPassword(false)} className='text-gray-500 cursor-pointer' />
                : <AiFillEye onClick={() => setShowNewPassword(true)} className='text-gray-500 cursor-pointer' />
              }
            </div>
          </div>
          <div className='mb-5'>
            <label htmlFor='newPasswordConfirmation' className='text-sm'>New Password Confirmation</label>
            <div className='border border-gray-300 rounded-md p-3 mt-2 flex items-center justify-between'>
              <input type={showNewPasswordConfirmation ? 'text' : 'password'} id='newPasswordConfirmation' name='newPasswordConfirmation' onChange={handleChange} className='outline-none text-sm w-full' />
              {
                showNewPasswordConfirmation
                ? <AiFillEyeInvisible onClick={() => setShowNewPasswordConfirmation(false)} className='text-gray-500 cursor-pointer' />
                : <AiFillEye onClick={() => setShowNewPasswordConfirmation(true)} className='text-gray-500 cursor-pointer' />
              }
            </div>
          </div>
          <button className='bg-blue-500 text-white text-sm font-semibold rounded-md py-2 outline-none transition hover:bg-blue-600 w-full'>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
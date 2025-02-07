import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai'
import { FormChanged, FormSubmitted } from './../../utils/interface'
import useStore from './../../store/store'
import { patchDataAPI } from '../../utils/fetchData'

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
  const [loading, setLoading] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false)

  const { userState, initiate } = useStore()

  const handleChange = (e: FormChanged) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmitted) => {
    e.preventDefault()
    setLoading(true)

    if (passwordData.newPassword !== passwordData.newPasswordConfirmation) {
      setLoading(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
      })
      setOpenChangePasswordOverlay(false)
      initiate('Password confirmation should be matched', 'error')
      return
    }

    try {
      const res = await patchDataAPI('/api/v1/users/changePassword', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, userState.data.accessToken)
      setOpenChangePasswordOverlay(false)
      initiate(res.data.msg, 'success')
    } catch (err: any) {
      setOpenChangePasswordOverlay(false)
      initiate(err.response.data.msg, 'error')
    }
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    })
    setLoading(false)
  }

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20 ${openChangePasswordOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition px-5`}>
      <div ref={changePasswordOverlayRef} className={`bg-zinc-700 transition rounded-md ${openChangePasswordOverlay ? 'translate-y-0' : '-translate-y-16'} md:w-1/3 w-full`}>
        <div className='px-5 py-3 border-b border-neutral-600 text-neutral-300 flex items-center justify-between'>
          <p className='font-semibold'>Change Password</p>
          <AiOutlineClose onClick={() => setOpenChangePasswordOverlay(false)} className='cursor-pointer' />
        </div>
        <form onSubmit={handleSubmit} className='px-5 py-3'>
          <div className='mb-5'>
            <label htmlFor='currentPassword' className='text-sm text-neutral-300'>Current Password</label>
            <div className='bg-zinc-600 border border-neutral-500 rounded-md p-3 mt-3 flex items-center justify-between'>
              <input type={showCurrentPassword ? 'text' : 'password'} id='currentPassword' name='currentPassword' value={passwordData.currentPassword} onChange={handleChange} className='bg-transparent outline-none text-sm w-full text-neutral-300' />
              {
                showCurrentPassword
                ? <AiFillEyeInvisible onClick={() => setShowCurrentPassword(false)} className='text-neutral-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowCurrentPassword(true)} className='text-neutral-400 cursor-pointer' />
              }
            </div>
          </div>
          <div className='mb-5'>
            <label htmlFor='newPassword' className='text-sm text-neutral-300'>New Password</label>
            <div className='border border-neutral-500 bg-zinc-600 rounded-md p-3 mt-2 flex items-center justify-between'>
              <input type={showNewPassword ? 'text' : 'password'} id='newPassword' name='newPassword' value={passwordData.newPassword} onChange={handleChange} className='outline-none text-sm w-full bg-transparent text-neutral-300' />
              {
                showNewPassword
                ? <AiFillEyeInvisible onClick={() => setShowNewPassword(false)} className='text-neutral-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowNewPassword(true)} className='text-neutral-400 cursor-pointer' />
              }
            </div>
          </div>
          <div className='mb-5'>
            <label htmlFor='newPasswordConfirmation' className='text-sm text-neutral-300'>New Password Confirmation</label>
            <div className='border border-neutral-500 bg-zinc-600 rounded-md p-3 mt-2 flex items-center justify-between'>
              <input type={showNewPasswordConfirmation ? 'text' : 'password'} id='newPasswordConfirmation' name='newPasswordConfirmation' value={passwordData.newPasswordConfirmation} onChange={handleChange} className='bg-transparent text-neutral-300 outline-none text-sm w-full' />
              {
                showNewPasswordConfirmation
                ? <AiFillEyeInvisible onClick={() => setShowNewPasswordConfirmation(false)} className='text-neutral-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowNewPasswordConfirmation(true)} className='text-neutral-400 cursor-pointer' />
              }
            </div>
          </div>
          <button disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.newPasswordConfirmation} className={`${loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.newPasswordConfirmation ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} text-white text-sm font-semibold rounded-md py-2 outline-none transition w-full`}>
            {
              loading ? 'Loading ...' : 'Save Changes'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
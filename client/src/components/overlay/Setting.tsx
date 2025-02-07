import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import useStore from './../../store/store'
import { patchDataAPI } from '../../utils/fetchData'

interface IProps {
  openSettingOverlay: boolean
  setOpenSettingOverlay: React.Dispatch<React.SetStateAction<boolean>>
  settingOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const Setting: React.FC<IProps> = ({ openSettingOverlay, setOpenSettingOverlay, settingOverlayRef }) => {
  const [openChangePasswordOverlay, setOpenChangePasswordOverlay] = useState(false)
  const [privateAccount, setPrivateAccount] = useState(true)
  const [loading, setLoading] = useState(false)

  const { userState, logout, initiate, clear } = useStore()

  const navigate = useNavigate()

  const changePasswordOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickChangePassword = () => {
    setOpenSettingOverlay(false)
    setOpenChangePasswordOverlay(true)
  }

  const handleSignOut = async() => {
    await logout()
    navigate('/login')
  }

  const handleChangeAccountPrivacy = async() => {
    clear()
    setLoading(true)

    try {
      const res = await patchDataAPI('/api/v1/users/changeAccountPrivacy', {
        privacyStatus: privateAccount
      }, userState.data.accessToken)
      setOpenSettingOverlay(false)
      initiate(res.data.msg, 'success')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (userState.data.user)
      setPrivateAccount(userState.data.user.private)
  }, [userState.data.user])
  
  return (
    <>
      <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] z-20 flex items-center justify-center transition ${openSettingOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} px-12`}>
        <div ref={settingOverlayRef} className={`bg-zinc-700 rounded-md xl:w-1/3 lg:w-1/2 w-full transition ${openSettingOverlay ? 'translate-y-0' : '-translate-y-16'} px-5 py-3`}>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-neutral-300'>Account Privacy</p>
            <div onClick={() => setPrivateAccount(!privateAccount)} className='relative cursor-pointer'>
              <div className='w-12 h-6 bg-gray-200 border border-gray-300 rounded-full'/>
              <div className={`w-4 h-4 ${privateAccount ? 'bg-blue-500 right-1' : 'bg-gray-500 left-1'} rounded-full absolute top-1/2 -translate-y-1/2`} />
            </div>
          </div>
          <button onClick={handleChangeAccountPrivacy} disabled={loading ? true : false} className={`${loading ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} text-white text-sm rounded-md w-full py-2 transition outline-none mt-5`}>
            {
              loading ? 'Loading ...' : 'Save Changes'
            }
          </button>
          <div className='my-5 w-full h-[1px] border-b border-neutral-500' />
          <div>
            <button onClick={handleClickChangePassword} className='w-full mb-5 text-sm py-2 outline-none transition text-neutral-300 bg-zinc-600 rounded-md hover:bg-zinc-500 font-semibold'>Change Password</button>
            <button onClick={handleSignOut} className='bg-red-500 text-white text-sm rounded-md w-full py-2 outline-none transition hover:bg-red-600'>Sign Out</button>
          </div>
        </div>
      </div>

      <ChangePassword
        openChangePasswordOverlay={openChangePasswordOverlay}
        setOpenChangePasswordOverlay={setOpenChangePasswordOverlay}
        changePasswordOverlayRef={changePasswordOverlayRef}
      />
    </>
  )
}

export default Setting
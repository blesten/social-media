import { useState, useRef } from 'react'
import ChangePassword from './ChangePassword'

interface IProps {
  openSettingOverlay: boolean
  setOpenSettingOverlay: React.Dispatch<React.SetStateAction<boolean>>
  settingOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const Setting: React.FC<IProps> = ({ openSettingOverlay, setOpenSettingOverlay, settingOverlayRef }) => {
  const [openChangePasswordOverlay, setOpenChangePasswordOverlay] = useState(false)
  const [privateAccount, setPrivateAccount] = useState(true)

  const changePasswordOverlayRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickChangePassword = () => {
    setOpenSettingOverlay(false)
    setOpenChangePasswordOverlay(true)
  }
  
  return (
    <>
      <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] z-20 flex items-center justify-center transition ${openSettingOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div ref={settingOverlayRef} className={`bg-white rounded-md w-1/3 transition ${openSettingOverlay ? 'translate-y-0' : '-translate-y-16'} px-5 py-3`}>
          <div className='flex items-center justify-between'>
            <p className='font-semibold'>Account Privacy</p>
            <div onClick={() => setPrivateAccount(!privateAccount)} className='relative cursor-pointer'>
              <div className='w-12 h-6 bg-gray-200 border border-gray-300 rounded-full'/>
              <div className={`w-4 h-4 ${privateAccount ? 'bg-blue-500 right-1' : 'bg-gray-500 left-1'} rounded-full absolute top-1/2 -translate-y-1/2`} />
            </div>
          </div>
          <button className='bg-blue-500 text-white text-sm rounded-md w-full py-2 transition outline-none hover:bg-blue-600 mt-5'>Save Changes</button>
          <hr className='my-5' />
          <div>
            <button onClick={handleClickChangePassword} className='w-full mb-5 text-sm py-2 outline-none transition hover:bg-gray-100 font-semibold'>Change Password</button>
            <button className='bg-red-500 text-white text-sm rounded-md w-full py-2 outline-none transition hover:bg-red-600'>Sign Out</button>
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
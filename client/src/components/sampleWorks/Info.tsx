import { useState, useEffect } from 'react'
import InfoOverlay from './InfoOverlay'

const Info = () => {
  const [openInfoOverlay, setOpenInfoOverlay] = useState(false)

  useEffect(() => {
    const checkLsVal = () => {
      const lsVal = localStorage.getItem('vpp_bcs_sw_sm')
      if (!lsVal)
        setOpenInfoOverlay(true)
      else if (lsVal !== 'y')
        setOpenInfoOverlay(true)
      else
        setOpenInfoOverlay(false)
    }

    checkLsVal()
  }, [])
  
  return (
    <>
      <div style={{ wordSpacing: '2px' }} className='text-sm text-center py-3 bg-orange-500 text-white'>
        <p>This is a <strong>Byte Craft Studio</strong> sample works for demonstration purposes only. Click <span onClick={() => setOpenInfoOverlay(true)} className='text-orange-200 underline cursor-pointer'>here</span> to see this sample works policy</p>
      </div>

      <InfoOverlay
        openInfoOverlay={openInfoOverlay}
        setOpenInfoOverlay={setOpenInfoOverlay}
      />
    </>
  )
}

export default Info
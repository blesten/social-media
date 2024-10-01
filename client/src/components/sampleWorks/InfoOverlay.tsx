import { AiOutlineClose } from 'react-icons/ai'

interface IProps {
  openInfoOverlay: boolean
  setOpenInfoOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const InfoOverlay = ({ openInfoOverlay, setOpenInfoOverlay }: IProps) => {
  const handleClose = () => {
    setOpenInfoOverlay(false)
    localStorage.setItem('vpp_bcs_sw_sm', 'y')
  }

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 z-20 bg-[rgba(0,0,0,.7)] flex items-center justify-center p-10 transition ${openInfoOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`md:w-1/2 w-full rounded-lg bg-white transition delay-150 origin-top ${openInfoOverlay ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-16 opacity-0 pointer-events-none'}`}>
        <div className='flex items-center justify-between border-b border-gray-300 py-5 px-6'>
          <h1 className='font-semibold text-sm'>Byte Craft Studio Sample Works Policy</h1>
          <AiOutlineClose onClick={handleClose} className='cursor-pointer text-lg' />
        </div>
        <div className='px-6 py-5 h-[75vh] overflow-auto'>
          <p className='text-sm mb-8 text-gray-600'>By using the Byte Craft Studio sample works website, you agree to our policies.</p>
          <div>
            <h1 className='font-semibold text-gray-600 text-sm'>Data Usage Policy</h1>
            <div className='text-sm flex flex-col gap-4 mt-5 text-justify'>
              <p className='leading-relaxed'>Data collected while navigating this sample website will not be used for any marketing purposes by Byte Craft Studio.</p>
              <p className='leading-relaxed'>Byte Craft Studio is not responsible for the exposure of any personally identifiable information (PII) on this sample website.</p>
              <p className='leading-relaxed'>Byte Craft Studio reserves the right to reset data on this sample website at our discretion.</p>
            </div>
          </div>
          <hr className='my-6 border-b border-gray-200' />
          <div>
            <h1 className='font-semibold text-gray-600 text-sm'>Testing Account</h1>
            <div className='mt-5 text-sm'>
              <table className='w-full'>
                <tr className='text-center font-semibold text-white bg-gray-800'>
                  <td className='py-3'>User Type</td>
                  <td>Credential</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-6 text-center'>User</td>
                  <td>
                    <div className='flex items-center justify-center gap-2'>
                      <div className='flex flex-col gap-2'>
                        <p>Username</p>
                        <p>Password</p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p>:</p>
                        <p>:</p>
                      </div>
                      <div className='ml-2 flex flex-col gap-2'>
                        <p>gianna_james</p>
                        <p>Giannajames1234_</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <hr className='my-6 border-b border-gray-200' />
          <div>
            <h1 className='font-semibold text-gray-600 text-sm'>Assets</h1>
            <p className='leading-relaxed text-sm mt-5 text-justify'>All assets used in this sample project, including images, icons, and logos, are for demonstration purposes only and are not intended for commercial use. While every effort was made to credit the original creators, some details may have been overlooked. If you recognize any asset as your creation and require credit, please contact us, and we will be happy to update the credits accordingly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoOverlay
import { AiOutlineClose } from 'react-icons/ai'
import { MdFileUpload } from 'react-icons/md'

interface IProps {
  openUpsertPostOverlay: boolean
  setOpenUpsertPostOverlay: React.Dispatch<React.SetStateAction<boolean>>
  upsertPostOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const UpsertPost: React.FC<IProps> = ({ openUpsertPostOverlay, setOpenUpsertPostOverlay, upsertPostOverlayRef }) => {
  return (
    <div className={`z-20 fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.6)] ${openUpsertPostOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition flex items-center justify-center`}>
      <div ref={upsertPostOverlayRef} className={`w-1/3 bg-white rounded-md ${openUpsertPostOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
          <h1 className='font-semibold'>Create Post</h1>
          <AiOutlineClose onClick={() => setOpenUpsertPostOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='px-5 py-3'>
          <div className='w-full h-[250px] bg-gray-200 rounded-md flex items-center justify-center flex-col'>
            <MdFileUpload className='text-gray-300 text-9xl' />
            <p className='text-sm font-semibold text-gray-500'><span className='underline text-blue-500 cursor-pointer'>Upload</span> images/videos from device</p>
          </div>
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
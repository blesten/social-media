import { BsFillQuestionCircleFill } from 'react-icons/bs'

interface IProps {
  openDeleteOverlay: boolean
  setOpenDeleteOverlay: React.Dispatch<React.SetStateAction<boolean>>
  deleteOverlayRef: React.MutableRefObject<HTMLDivElement>
  onSuccess?: () => void
}

const Delete: React.FC<IProps> = ({ openDeleteOverlay, setOpenDeleteOverlay, deleteOverlayRef, onSuccess }) => {
  const handleClickClose = () => {
    setOpenDeleteOverlay(false)
  }

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,.8)] flex items-center justify-center ${openDeleteOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition p-10`}>
      <div ref={deleteOverlayRef} className={`lg:w-[380px] md:w-1/2 w-full bg-white rounded-md flex flex-col items-center justify-center py-7 ${openDeleteOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <BsFillQuestionCircleFill className='text-red-500 text-8xl' />
        <p className='text-center mt-5 font-semibold'>Are you sure to delete?</p>
        <div className='flex items-center gap-8 mt-7'>
          <button onClick={handleClickClose} className='text-sm text-neutral-500 outline-none'>No, I'm not sure</button>
          <button onClick={onSuccess} className='bg-red-500 text-white text-sm outline-none rounded-md px-4 py-2 hover:bg-red-600 transition'>Yes, I'm Sure</button>
        </div>
      </div>
    </div>
  )
}

export default Delete
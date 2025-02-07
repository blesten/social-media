import { AiOutlineClose } from "react-icons/ai"
import UserCard from "../home/UserCard"
import { IFollow } from "../../utils/interface"
import { PiNoteBlankLight } from "react-icons/pi"

interface IProps {
  openFollowRequestsOverlay: boolean
  setOpenFollowRequestsOverlay: React.Dispatch<React.SetStateAction<boolean>>
  followRequestOverlayRef: React.MutableRefObject<HTMLDivElement>
  followRequests: IFollow[]
}

const FollowRequests: React.FC<IProps> = ({ openFollowRequestsOverlay, setOpenFollowRequestsOverlay, followRequestOverlayRef, followRequests }) => {
  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20 ${openFollowRequestsOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition px-12`}>
      <div ref={followRequestOverlayRef} className={`xl:w-1/3 lg:w-1/2 w-full bg-zinc-700 rounded-md ${openFollowRequestsOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='px-5 py-3 flex items-center justify-between border-b text-neutral-300 border-neutral-600'>
          <h1 className='font-semibold'>Follow Requests</h1>
          <AiOutlineClose onClick={() => setOpenFollowRequestsOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='max-h-[80vh] overflow-auto hide-scrollbar px-5 py-3 flex flex-col gap-3'>
          {
            followRequests.length < 1
            ? (
              <div className='flex flex-col items-center gap-3 my-8 text-neutral-500'>
                <div className='relative'>
                  <PiNoteBlankLight className='text-6xl' />
                  <div className='absolute -top-3 left-6 w-1 h-20 bg-neutral-600 rotate-45' />
                </div>
                <p className='text-sm font-semibold'>Follow requests is currently empty</p>
              </div>
            )
            : (
              <>
                {
                  followRequests.map((item, idx) => (
                    <UserCard key={idx} user={item.user} isAccept={true} />
                  ))
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FollowRequests
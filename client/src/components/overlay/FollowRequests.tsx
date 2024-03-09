import { AiOutlineClose } from "react-icons/ai"
import UserCard from "../home/UserCard"

interface IProps {
  openFollowRequestsOverlay: boolean
  setOpenFollowRequestsOverlay: React.Dispatch<React.SetStateAction<boolean>>
  followRequestOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const FollowRequests: React.FC<IProps> = ({ openFollowRequestsOverlay, setOpenFollowRequestsOverlay, followRequestOverlayRef }) => {
  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20 ${openFollowRequestsOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition px-12`}>
      <div ref={followRequestOverlayRef} className={`xl:w-1/3 lg:w-1/2 w-full bg-white rounded-md ${openFollowRequestsOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='px-5 py-3 flex items-center justify-between border-b border-gray-300'>
          <h1 className='font-semibold'>Follow Requests</h1>
          <AiOutlineClose onClick={() => setOpenFollowRequestsOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='max-h-[80vh] overflow-auto hide-scrollbar px-5 py-3 flex flex-col gap-3'>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default FollowRequests
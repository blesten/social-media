import { AiOutlineClose } from "react-icons/ai"
import UserCard from "../home/UserCard"

interface IProps {
  openFollowersOverlay: boolean
  setOpenFollowersOverlay: React.Dispatch<React.SetStateAction<boolean>>
  followersOverlayRef: React.MutableRefObject<HTMLDivElement>
}

const Followers: React.FC<IProps> = ({ openFollowersOverlay, setOpenFollowersOverlay, followersOverlayRef }) => {
  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20 ${openFollowersOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition`}>
      <div ref={followersOverlayRef} className={`w-1/3 bg-white rounded-md ${openFollowersOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='px-5 py-3 flex items-center justify-between border-b border-gray-300'>
          <h1 className='font-semibold'>Followers</h1>
          <AiOutlineClose onClick={() => setOpenFollowersOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='max-h-[80vh] overflow-auto hide-scrollbar px-5 py-3'>
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

export default Followers
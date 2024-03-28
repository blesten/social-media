import { AiOutlineClose } from "react-icons/ai"
import UserCard from "../home/UserCard"
import { IFollow } from "../../utils/interface"
import { PiNoteBlankLight } from "react-icons/pi"

interface IProps {
  openFollowersOverlay: boolean
  setOpenFollowersOverlay: React.Dispatch<React.SetStateAction<boolean>>
  followersOverlayRef: React.MutableRefObject<HTMLDivElement>
  followers: IFollow[]
}

const Followers: React.FC<IProps> = ({ openFollowersOverlay, setOpenFollowersOverlay, followersOverlayRef, followers }) => {
  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] flex items-center justify-center z-20 ${openFollowersOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition px-12`}>
      <div ref={followersOverlayRef} className={`xl:w-1/3 lg:w-1/2 w-full bg-white rounded-md ${openFollowersOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='px-5 py-3 flex items-center justify-between border-b border-gray-300'>
          <h1 className='font-semibold'>Followers</h1>
          <AiOutlineClose onClick={() => setOpenFollowersOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='max-h-[80vh] overflow-auto hide-scrollbar px-5 py-3'>
          {
            followers.length < 1
            ? (
              <div className='flex flex-col items-center mb-3'>
                <PiNoteBlankLight className='text-gray-300 text-8xl' />
                <p className='text-gray-400 font-semibold'>Follower is empty</p>
              </div>
            )
            : (
              <>
                {
                  followers.map((item, idx) => (
                    <UserCard key={idx} user={item.user} />
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

export default Followers
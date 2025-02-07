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
      <div ref={followersOverlayRef} className={`xl:w-1/3 lg:w-1/2 w-full bg-zinc-700 rounded-md ${openFollowersOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='px-5 py-3 flex items-center justify-between border-b border-neutral-600 text-neutral-300'>
          <h1 className='font-semibold'>Followers</h1>
          <AiOutlineClose onClick={() => setOpenFollowersOverlay(false)} className='cursor-pointer' />
        </div>
        <div className='max-h-[80vh] overflow-auto hide-scrollbar px-5 py-3'>
          {
            followers.length < 1
            ? (
              <div className='flex flex-col items-center gap-3 my-8 text-neutral-500'>
                <div className='relative'>
                  <PiNoteBlankLight className='text-6xl' />
                  <div className='absolute -top-3 left-6 w-1 h-20 bg-neutral-600 rotate-45' />
                </div>
                <p className='text-sm font-semibold'>Follower is currently empty</p>
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
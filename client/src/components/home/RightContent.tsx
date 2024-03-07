import { IoMdRefresh } from 'react-icons/io'
import UserCard from './UserCard'

const RightContent = () => {
  return (
    <div className='flex-1 h-fit sticky top-28 px-8'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-blue-500'>People you might know</p>
        <IoMdRefresh className='cursor-pointer' />
      </div>
      <div className='mt-7'>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  )
}

export default RightContent
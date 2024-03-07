import { AiOutlineHeart } from "react-icons/ai"

const Comment = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 rounded-full bg-gray-200'></div>
        <div>
          <p className='font-semibold'>Gianna Louis</p>
          <p className='text-xs mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        <AiOutlineHeart className='text-lg' />
        <p className='text-xs'>1000</p>
      </div>
    </div>
  )
}

export default Comment
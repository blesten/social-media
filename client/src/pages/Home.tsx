import { IoMdHome, IoMdRefresh } from 'react-icons/io'
import { FaBookmark, FaCaretLeft, FaCaretRight, FaCommentDots, FaUsers } from 'react-icons/fa'
import { IoEllipsisVerticalSharp, IoPeopleSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import Navbar from './../components/general/Navbar'
import { AiOutlineHeart } from 'react-icons/ai'

const Home = () => {
  const { pathname } = useLocation()

  return (
    <div className='bg-light-gray'>
      <Navbar />
      <div className='flex gap-6 min-h-screen pt-6'>
        <div className='flex-1 h-fit sticky top-28 px-8'>
          <div className='border boder-gray-100 rounded-lg pb-3'>
            <div className='rounded-t-lg bg-gray-200 h-[100px] relative'>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full w-24 h-24 bg-gray-300'></div>
            </div>
            <div className='flex items-center justify-between px-4 py-3'>
              <div className='text-center'>
                <p className='text-lg mb-1'>1984</p>
                <p className='text-gray-500 text-xs'>Followers</p>
              </div>
              <div className='text-center'>
                <p className='text-lg mb-1'>2000</p>
                <p className='text-gray-500 text-xs'>Followings</p>
              </div>
            </div>
            <div className='text-center px-7 mt-1'>
              <h1 className='font-semibold mb-1'>Gianna Louis</h1>
              <p className='text-gray-500 text-xs'>@giannalouis</p>
              <p className='text-xs mt-4 leading-relaxed'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, atque.</p>
            </div>
          </div>
          <div className='mt-7'>
            <p className='font-semibold text-blue-500'>Latest Activity</p>
            <div className='mt-4'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
                <div>
                  <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
                  <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
                </div>
              </div>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
                <div>
                  <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
                  <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
                <div>
                  <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
                  <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-[2]'>
          <div className='rounded-xl bg-white px-8 py-5 mb-10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-5'>
                <div className='w-14 h-14 rounded-full bg-gray-200'></div>
                <div>
                  <h1 className='font-semibold'>Gianna Louis</h1>
                  <p className='text-xs text-gray-500 mt-1'>4 hours ago</p>
                </div>
              </div>
              <div>
                <IoEllipsisVerticalSharp />
              </div>
            </div>
            <div className='mt-6'>
              <p className='leading-relaxed text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut a nesciunt adipisci enim quas repudiandae.</p>
              <div className='mt-5 relative'>
                <div className='w-full h-[300px] bg-gray-100 rounded-lg'></div>
                <div className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer'>
                  <FaCaretLeft />
                </div>
                <div className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                  <FaCaretRight />
                </div>
                <div className='flex absolute bottom-4 gap-2 left-1/2 -translate-x-1/2'>
                  <div className='w-2 h-2 bg-gray-600 rounded-full shadow-md border border-gray-200' />
                  <div className='w-2 h-2 bg-white rounded-full shadow-md border border-gray-200' />
                  <div className='w-2 h-2 bg-white rounded-full shadow-md border border-gray-200' />
                  <div className='w-2 h-2 bg-white rounded-full shadow-md border border-gray-200' />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between mt-5 gap-6'>
              <div className='flex items-center gap-5'>
                <div className='flex items-center gap-2'>
                  <AiOutlineHeart className='text-lg' />
                  <p className='text-sm'>1.2K</p>
                </div>
                <div className='flex items-center gap-2'>
                  <FaCommentDots className='text-blue-500 text-lg' />
                  <p className='text-sm'>550</p>
                </div>
              </div>
              <div className='relative rounded-full bg-gray-100 border border-gray-200 flex-1 h-10'>
                <input type='text' className='outline-none bg-transparent w-full px-4 h-10 text-sm' />
                <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400'>Write your comment</p>
              </div>
            </div>
            <hr className='my-5' />
            <div>
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
              <p className='text-xs text-center mt-8 text-gray-400 cursor-pointer'>Load more comments</p>
            </div>
          </div>
          <div className='rounded-xl bg-white px-8 py-5 mb-10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-5'>
                <div className='w-14 h-14 rounded-full bg-gray-200'></div>
                <div>
                  <h1 className='font-semibold'>Gianna Louis</h1>
                  <p className='text-xs text-gray-500 mt-1'>4 hours ago</p>
                </div>
              </div>
              <div>
                <IoEllipsisVerticalSharp />
              </div>
            </div>
            <div className='mt-6'>
              <p className='leading-relaxed text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut a nesciunt adipisci enim quas repudiandae.</p>
              <div className='mt-5 relative'>
                <div className='w-full h-[300px] bg-gray-100 rounded-lg'></div>
                <div className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer'>
                  <FaCaretLeft />
                </div>
                <div className='w-7 h-7 shadow-xl border border-gray-200 text-gray-500 rounded-full bg-white flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                  <FaCaretRight />
                </div>
                <div className='flex absolute bottom-4 gap-2 left-1/2 -translate-x-1/2'>
                  <div className='w-2 h-2 bg-gray-600 rounded-full shadow-md border border-gray-200' />
                  <div className='w-2 h-2 bg-white rounded-full shadow-md border border-gray-200' />
                  <div className='w-2 h-2 bg-white rounded-full shadow-md border border-gray-200' />
                  <div className='w-2 h-2 bg-white rounded-full shadow-md border border-gray-200' />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between mt-5 gap-6'>
              <div className='flex items-center gap-5'>
                <div className='flex items-center gap-2'>
                  <AiOutlineHeart className='text-lg' />
                  <p className='text-sm'>1.2K</p>
                </div>
                <div className='flex items-center gap-2'>
                  <FaCommentDots className='text-blue-500 text-lg' />
                  <p className='text-sm'>550</p>
                </div>
              </div>
              <div className='relative rounded-full bg-gray-100 border border-gray-200 flex-1 h-10'>
                <input type='text' className='outline-none bg-transparent w-full px-4 h-10 text-sm' />
                <p className='absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400'>Write your comment</p>
              </div>
            </div>
            <hr className='my-5' />
            <div>
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
              <p className='text-xs text-center mt-8 text-gray-400 cursor-pointer'>Load more comments</p>
            </div>
          </div>
        </div>
        <div className='flex-1 h-fit sticky top-28 px-8'>
          <div className='flex items-center justify-between cursor-pointer'>
            <p className='font-semibold text-blue-500'>People you might know</p>
            <IoMdRefresh />
          </div>
          <div className='mt-7'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 rounded-full bg-gray-200' />
                <div>
                  <p className='font-semibold text-sm'>John doe</p>
                  <p className='text-xs text-gray-500'>@johndoe</p>
                </div>
              </div>
              <button className='bg-blue-500 text-xs text-white font-semibold rounded-md px-4 py-2'>Follow</button>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 rounded-full bg-gray-200' />
                <div>
                  <p className='font-semibold text-sm'>John doe</p>
                  <p className='text-xs text-gray-500'>@johndoe</p>
                </div>
              </div>
              <button className='bg-blue-500 text-xs text-white font-semibold rounded-md px-4 py-2'>Follow</button>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 rounded-full bg-gray-200' />
                <div>
                  <p className='font-semibold text-sm'>John doe</p>
                  <p className='text-xs text-gray-500'>@johndoe</p>
                </div>
              </div>
              <button className='bg-blue-500 text-xs text-white font-semibold rounded-md px-4 py-2'>Follow</button>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 rounded-full bg-gray-200' />
                <div>
                  <p className='font-semibold text-sm'>John doe</p>
                  <p className='text-xs text-gray-500'>@johndoe</p>
                </div>
              </div>
              <button className='bg-blue-500 text-xs text-white font-semibold rounded-md px-4 py-2'>Follow</button>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 rounded-full bg-gray-200' />
                <div>
                  <p className='font-semibold text-sm'>John doe</p>
                  <p className='text-xs text-gray-500'>@johndoe</p>
                </div>
              </div>
              <button className='bg-blue-500 text-xs text-white font-semibold rounded-md px-4 py-2'>Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
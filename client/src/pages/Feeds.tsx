import { useState } from 'react'
import { IoMdGrid } from 'react-icons/io'
import { FaRegBookmark } from 'react-icons/fa'
import Navbar from './../components/general/Navbar'
import HeadInfo from './../utils/HeadInfo'
import Header from './../components/feeds/Header'
import PostCard from './../components/feeds/PostCard'

const Feeds = () => {
  const [tab, setTab] = useState('posts')

  const handleChangeTab = (tab: string) => {
    setTab(tab)
  }

  return (
    <>
      <HeadInfo title='Feeds' />
      <div>
        <Navbar />
        <Header />
        <div className='flex items-center justify-center gap-20 pb-5'>
          <div onClick={() => handleChangeTab('posts')} className={`flex items-center gap-2 text-lg cursor-pointer relative after:content-[ ] after:absolute after:w-[140%] after:left-1/2 after:-translate-x-1/2 after:h-[2px] ${tab === 'posts' ? 'after:bg-black' : 'after:bg-transparent'} after:-bottom-2`}>
            <IoMdGrid />
            <p>Posts</p>
          </div>
          <div onClick={() => handleChangeTab('saved')} className={`flex items-center gap-2 text-lg cursor-pointer relative after:content-[ ] after:absolute after:w-[140%] after:left-1/2 after:-translate-x-1/2 after:h-[2px] ${tab === 'saved' ? 'after:bg-black' : 'after:bg-transparent'} after:-bottom-2`}>
            <FaRegBookmark />
            <p>Saved</p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='xl:w-2/3 lg:w-4/5 pt-8 pb-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-7 lg:px-0 px-10 gap-x-10'>
            {/* <p className='bg-red-500 text-white text-center py-2 rounded-md font-semibold text-sm'>Post is empty</p> */}
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Feeds
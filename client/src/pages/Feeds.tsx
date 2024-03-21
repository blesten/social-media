import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdGrid } from 'react-icons/io'
import { HiLockClosed } from 'react-icons/hi2'
import { FaRegBookmark } from 'react-icons/fa'
import { getDataAPI } from '../utils/fetchData'
import { IUser } from '../utils/interface'
import useStore from './../store/store'
import Navbar from './../components/general/Navbar'
import HeadInfo from './../utils/HeadInfo'
import Header from './../components/feeds/Header'
import PostCard from './../components/feeds/PostCard'

const Feeds = () => {
  const [tab, setTab] = useState('posts')
  const [user, setUser] = useState<Partial<IUser>>({})
  const [error, setError] = useState(false)

  const { userState } = useStore()
  const { id } = useParams()

  const handleChangeTab = (tab: string) => {
    setTab(tab)
  }

  useEffect(() => {
    const getUserProfile = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/${id}`, token)
        setUser(res.data.user)
      } catch (err: any) {
        setError(true)
      }
    }

    if (userState.data.accessToken)
      getUserProfile(`${id}`, userState.data.accessToken)
  }, [id, userState.data.accessToken])

  return (
    <>
      <HeadInfo title='Feeds' />
      <div>
        <Navbar />
        {
          !error && Object.keys(user).length > 0
          ? (
            <>
              <Header user={user as IUser} />
              {
                user.private && userState.data.user?._id !== user._id
                ? (
                  <div className='flex items-center justify-center flex-col mt-6'>
                    <HiLockClosed className='text-7xl text-gray-400' />
                    <p className='text-lg font-semibold mt-3'>This is a private account</p>
                  </div>
                )
                : (
                  <>
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
                  </>
                )
              }
            </>
          )
          : (
            <div>
              error
            </div>
          )
        }
      </div>
    </>
  )
}

export default Feeds
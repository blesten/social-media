import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoMdGrid } from 'react-icons/io'
import { HiLockClosed } from 'react-icons/hi2'
import { FaRegBookmark } from 'react-icons/fa'
import { getDataAPI } from '../utils/fetchData'
import { IFollow, IPost, IUser } from '../utils/interface'
import useStore from './../store/store'
import Navbar from './../components/general/Navbar'
import HeadInfo from './../utils/HeadInfo'
import Header from './../components/feeds/Header'
import PostCard from './../components/feeds/PostCard'

const Feeds = () => {
  const [tab, setTab] = useState('posts')
  const [user, setUser] = useState<Partial<IUser>>({})
  const [posts, setPosts] = useState<IPost[]>([])
  const [savedPosts, setSavedPosts] = useState<IPost[]>([])
  const [followers, setFollowers] = useState<IFollow[]>([])
  const [followings, setFollowings] = useState<IFollow[]>([])
  const [followRequests, setFollowRequests] = useState<IFollow[]>([])
  const [error, setError] = useState(false)

  const { userState } = useStore()
  const { id } = useParams()

  const navigate = useNavigate()

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

  useEffect(() => {
    const getFollowers = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/${id}/followers`, token)
        setFollowers(res.data.followers)
      } catch (err: any) {
        setError(true)
      }
    }

    if (userState.data.accessToken)
      getFollowers(`${id}`, userState.data.accessToken)
  }, [id, userState.data.accessToken])

  useEffect(() => {
    const getFollowings = async(id: string, token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/${id}/followings`, token)
        setFollowings(res.data.followings)
      } catch (err: any) {
        setError(true)
      }
    }

    if (userState.data.accessToken)
      getFollowings(`${id}`, userState.data.accessToken)
  }, [id, userState.data.accessToken])

  useEffect(() => {
    const getFollowRequests = async(token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/followRequests`, token)
        setFollowRequests(res.data.followRequests)
      } catch (err: any) {
        setError(true)
      }
    }

    if (userState.data.accessToken)
      getFollowRequests(userState.data.accessToken)
  }, [userState.data.accessToken])

  useEffect(() => {
    const getUserPosts = async(token: string) => {
      try {
        if (tab === 'posts') {
          const res = await getDataAPI(`/api/v1/posts/user/${id}`, token)
          setPosts(res.data.posts)
        } else if (tab === 'saved') {
          const res = await getDataAPI(`/api/v1/saved`, token)
          setSavedPosts(res.data.savedPosts.posts)
        }
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (userState.data.accessToken)
      getUserPosts(userState.data.accessToken)
  }, [id, userState.data.accessToken, tab])

  useEffect(() => {
    if (!userState.loading) {
      if (!userState.data.accessToken)
        navigate('/login')
    }
  }, [userState.data.accessToken, navigate])

  return (
    <>
      <HeadInfo title='Feeds' />
      <div>
        <Navbar />
        {
          !error && Object.keys(user).length > 0
          ? (
            <>
              <Header
                user={user as IUser}
                followers={followers}
                followings={followings}
                followRequests={followRequests}
                posts={posts}
                setUser={setUser}
              />
              {
                !user.private || userState.data.user?._id === user._id || followers.some(item => item.user._id === userState.data.user?._id)
                ? (
                  <>
                    <div className='flex items-center justify-center gap-20 pb-5'>
                      <div onClick={() => handleChangeTab('posts')} className={`flex items-center gap-2 text-lg cursor-pointer relative after:content-[ ] after:absolute after:w-[140%] after:left-1/2 after:-translate-x-1/2 after:h-[2px] ${tab === 'posts' ? 'after:bg-black' : 'after:bg-transparent'} after:-bottom-2`}>
                        <IoMdGrid />
                        <p>Posts</p>
                      </div>
                      {
                        userState.data.user?._id === id &&
                        <div onClick={() => handleChangeTab('saved')} className={`flex items-center gap-2 text-lg cursor-pointer relative after:content-[ ] after:absolute after:w-[140%] after:left-1/2 after:-translate-x-1/2 after:h-[2px] ${tab === 'saved' ? 'after:bg-black' : 'after:bg-transparent'} after:-bottom-2`}>
                          <FaRegBookmark />
                          <p>Saved</p>
                        </div>
                      }
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='xl:w-2/3 lg:w-4/5 pt-8 pb-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-7 lg:px-0 px-10 gap-x-10'>
                        {
                          tab === 'posts' &&
                          <>
                            {
                              posts.length > 0
                              ? (
                                <>
                                  {
                                    posts.map((item, idx) => (
                                      <PostCard key={idx} post={item} posts={posts} setPosts={setPosts} />
                                    ))
                                  }
                                </>
                              )
                              : (
                                <p className='bg-red-500 w-1/2 mt-8 text-white text-center py-2 rounded-md font-semibold text-sm'>Post is empty</p>
                              )
                            }
                          </>
                        }

                        {
                          tab === 'saved' &&
                          <>
                            {
                              savedPosts.length > 0
                              ? (
                                <>
                                  {
                                    savedPosts.map((item, idx) => (
                                      <PostCard key={idx} post={item} posts={savedPosts} setPosts={setSavedPosts} />
                                    ))
                                  }
                                </>
                              )
                              : (
                                <p className='bg-red-500 w-1/2 mt-8 text-white text-center py-2 rounded-md font-semibold text-sm'>Saved post is empty</p>
                              )
                            }
                          </>
                        }
                      </div>
                    </div>
                  </>
                )
                : (
                  <div className='flex items-center justify-center flex-col mt-6'>
                    <HiLockClosed className='text-7xl text-gray-400' />
                    <p className='text-lg font-semibold mt-3'>This is a private account</p>
                  </div>
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
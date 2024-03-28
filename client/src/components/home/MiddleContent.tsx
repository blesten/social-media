import { useEffect } from 'react'
import useStore from './../../store/store'
import Post from './Post'
import Loader from '../general/Loader'
import { PiNoteBlankLight } from 'react-icons/pi'

const MiddleContent = () => {
  const { userState, homeState, readPosts } = useStore()

  useEffect(() => {
    if (userState.data.accessToken)
      readPosts(userState.data.accessToken)
  }, [readPosts, userState.data.accessToken])

  return (
    <div className='xl:px-0 px-7 flex-[2]'>
      {
        homeState.loading
        ? <Loader size='xl' />
        : (
          <>
            {
              homeState.posts.length > 0
              ? (
                <>
                  {
                    homeState.posts.map(item => (
                      <Post
                        key={item._id}
                        id={item._id}
                        user={item.user}
                        caption={item.caption}
                        images={item.images}
                        likes={item.likes}
                        createdAt={item.createdAt}
                      />
                    ))
                  }
                </>
              )
              : (
                <div className='flex flex-col items-center gap-3'>
                  <PiNoteBlankLight className='text-gray-300 text-8xl' />
                  <p className='text-sm text-gray-400 font-semibold'>Post is currently empty</p>
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default MiddleContent
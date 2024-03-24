import { useEffect } from 'react'
import useStore from './../../store/store'
import Post from './Post'

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
        ? 'Loading ...'
        : (
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
      }
    </div>
  )
}

export default MiddleContent
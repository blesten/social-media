import { useState, useRef, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdFileUpload } from 'react-icons/md'
import { FormChanged, IPost } from './../../utils/interface'
import useStore from './../../store/store'

interface IProps {
  openUpsertPostOverlay: boolean
  setOpenUpsertPostOverlay: React.Dispatch<React.SetStateAction<boolean>>
  upsertPostOverlayRef: React.MutableRefObject<HTMLDivElement>
  selectedPost?: Partial<IPost>
  setSelectedPost?: React.Dispatch<React.SetStateAction<Partial<IPost>>>
}

const UpsertPost: React.FC<IProps> = ({ openUpsertPostOverlay, setOpenUpsertPostOverlay, upsertPostOverlayRef, selectedPost, setSelectedPost }) => {
  const [caption, setCaption] = useState('')
  const [posts, setPosts] = useState<(File | String)[]>([])
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const { userState, createPost, updatePost } = useStore()

  const handleCloseOverlay = () => {
    if (setSelectedPost)
      setSelectedPost({})
    setOpenUpsertPostOverlay(false)
  }

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (idx: number) => {
    const newPosts = [...posts]
    newPosts.splice(idx, 1)
    setPosts(newPosts)
  }

  const handleChangeImages = (e: FormChanged) => {
    const target = e.target as HTMLInputElement
    const files = [...Object.values(target.files!)]
    setPosts([...posts, ...files])
  }

  const handleSubmit = async() => {
    setLoading(true)
    if (selectedPost && Object.keys(selectedPost).length > 1) {
      await updatePost(selectedPost._id!, userState.data.accessToken!, caption, posts)
    } else {
      await createPost(caption, posts as File[], userState.data.accessToken!)
    }
    if (setSelectedPost)
      setSelectedPost!({})
    setOpenUpsertPostOverlay(false)
    setLoading(false)
  }

  useEffect(() => {
    if (selectedPost) {
      if (Object.keys(selectedPost).length > 0) {
        setCaption(selectedPost.caption!)
        setPosts(selectedPost.images!)
      } else {
        setCaption('')
        setPosts(selectedPost.images!)
      }
    }
  }, [selectedPost])

  return (
    <div className={`z-20 fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] ${openUpsertPostOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition flex items-center justify-center px-12`}>
      <div ref={upsertPostOverlayRef} className={`xl:w-1/3 md:w-2/3 w-full bg-white rounded-md ${openUpsertPostOverlay ? 'translate-y-0' : '-translate-y-16'} transition`}>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
          <h1 className='font-semibold'>Create Post</h1>
          <AiOutlineClose onClick={handleCloseOverlay} className='cursor-pointer' />
        </div>
        <div className='px-5 py-3'>
          {
            posts && posts.length < 1
            ? (
              <div className='w-full h-[250px] bg-gray-200 rounded-md flex items-center justify-center flex-col'>
                <MdFileUpload className='text-gray-300 text-9xl' />
                <p className='text-sm font-semibold text-gray-500'><span onClick={handleClickUpload} className='underline text-blue-500 cursor-pointer'>Upload</span> images/videos from device</p>
                <input type='file' ref={fileInputRef} onChange={handleChangeImages} className='hidden pointer-events-none' accept='image/*' multiple />
              </div>
            )
            : (
              <>
                <div className='w-full h-[250px] bg-gray-100 rounded-md grid grid-cols-4 gap-5 p-4 overflow-y-auto hide-scrollbar'>
                  {
                    posts && posts.map((item, idx) => (
                      <div className='relative'>
                        <img src={item instanceof File ? URL.createObjectURL(item) : `${item}`} alt='Byte Craft Studio - Social Media' className='w-24 h-24 rounded-md object-cover' />
                        <div onClick={() => handleRemoveImage(idx)} className='text-white bg-red-500 rounded-full w-5 font-semibold h-5 flex items-center justify-center text-xs -top-2 -right-2 absolute outline outline-white outline-2 cursor-pointer'>
                          <AiOutlineClose />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <input type='file' ref={fileInputRef} onChange={handleChangeImages} className='hidden pointer-events-none' accept='image/*' multiple />
                <p onClick={handleClickUpload} className='underline text-xs mt-2 w-fit text-blue-500 cursor-pointer'>Upload</p>
              </>
            )
          }
          <div className='mt-5'>
            <label htmlFor='caption' className='text-sm'>Caption</label>
            <textarea name='caption' id='caption' value={caption} onChange={e => setCaption(e.target.value)} className='w-full resize-none border border-gray-300 rounded-md h-24 outline-none text-sm p-3 mt-2' />
          </div>  
          <button onClick={handleSubmit} disabled={loading || caption.length < 5 || posts.length < 1} className={`${loading || caption.length < 5 || posts.length < 1 ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} mt-4 rounded-full text-white text-sm font-semibold py-2 w-full transition outline-none`}>
            {
              loading
              ? 'Loading ...'
              : selectedPost && Object.keys(selectedPost).length > 0 ? 'Save Changes' : 'Post'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpsertPost
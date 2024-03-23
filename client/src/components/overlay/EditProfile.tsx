import { useState, useEffect, useRef } from 'react'
import { AiFillCamera, AiOutlineClose } from 'react-icons/ai'
import { FormChanged, FormSubmitted, IUser } from '../../utils/interface'
import useStore from './../../store/store'
import { patchDataAPI } from '../../utils/fetchData'
import { uploadImages } from '../../utils/image'

interface IProps {
  openEditProfileOverlay: boolean
  setOpenEditProfileOverlay: React.Dispatch<React.SetStateAction<boolean>>
  editProfileOverlayRef: React.MutableRefObject<HTMLDivElement>
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>
}

const EditProfile: React.FC<IProps> = ({ openEditProfileOverlay, setOpenEditProfileOverlay, editProfileOverlayRef, user, setUser }) => {
  const [tempAvatar, setTempAvatar] = useState<File>()
  const [profileData, setProfileData] = useState({
    avatar: '',
    name: '',
    username: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const { userState, initiate } = useStore()

  const handleClickUpload = () => {
    fileInputRef.current.click()
  }

  const handleChangeAvatar = (e: FormChanged) => {
    const target = e.target as  HTMLInputElement
    const files = [...Object.values(target.files!)]
    setTempAvatar(files[0])
  }

  const handleChange = (e: FormChanged) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmitted) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ''
      if (tempAvatar) {
        const imageRes = await uploadImages([tempAvatar], 'users')
        imageUrl = imageRes[0]
      }
      
      const res = await patchDataAPI('/api/v1/users/editProfile', {
        avatar: tempAvatar ? imageUrl : profileData.avatar,
        name: profileData.name,
        username: profileData.username,
        description: profileData.description
      }, userState.data.accessToken)

      setUser({
        ...user,
        avatar: tempAvatar ? imageUrl : profileData.avatar,
        name: profileData.name,
        username: profileData.username,
        description: profileData.description
      })

      initiate(res.data.msg, 'success')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }

    setOpenEditProfileOverlay(false)
    setLoading(false)
  }

  useEffect(() => {
    if (userState.data.accessToken) {
      setProfileData({
        avatar: userState.data.user?.avatar as string,
        name: userState.data.user?.name as string,
        username: userState.data.user?.username as string,
        description: userState.data.user?.description as string
      })
    }
  }, [userState.data])

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.8)] z-30 transition ${openEditProfileOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex items-center justify-center px-12`}>
      <div ref={editProfileOverlayRef} className={`bg-white rounded-md xl:w-1/3 lg:w-1/2 w-full`}>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
          <h1 className='font-semibold'>Edit Profile</h1>
          <AiOutlineClose onClick={() => setOpenEditProfileOverlay(false)} className='cursor-pointer' />
        </div>
        <form onSubmit={handleSubmit} className='px-5 py-3'>
          <div className='group w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center m-auto mb-5 relative cursor-pointer border border-gray-300 shadow-md'>
            {
              tempAvatar
              ? <img src={URL.createObjectURL(tempAvatar)} alt='Social Sphere' className='w-full h-full rounded-full object-cover' />
              : profileData.avatar
                ? <img src={profileData.avatar} alt='Social Sphere' className='w-full h-full rounded-full object-cover' />
                : <p className='text-white text-4xl font-semibold tracking-widest'>{`${userState.data.user?.name[0]}${userState.data.user?.name.split(' ')[userState.data.user?.name.split(' ').length - 1][0]}`}</p>
            }
            <div onClick={handleClickUpload} className='absolute top-0 left-0 rounded-full w-full h-full flex items-center justify-center bg-[rgba(0,0,0,.6)] group-hover:opacity-100 opacity-0 transition'>
              <AiFillCamera className='text-5xl text-white' />
            </div>
            <input type='file' className='hidden' ref={fileInputRef} accept='image/*' onChange={handleChangeAvatar} />
          </div>
          <div className='mb-5'>
            <label htmlFor='name' className='text-sm'>Name</label>
            <input type='text' id='name' name='name' value={profileData.name} onChange={handleChange} className='outline-none w-full border border-gray-300 rounded-md px-2 py-3 text-sm mt-2' />
          </div>
          <div className='mb-5'>
            <label htmlFor='username' className='text-sm'>Username</label>
            <input type='text' id='username' name='username' value={profileData.username} onChange={handleChange} className='outline-none w-full border border-gray-300 rounded-md px-2 py-3 text-sm mt-2' />
          </div>
          <div className='mb-5'>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input type='text' id='email' name='email' value={userState.data.user?.email} className='outline-none w-full border border-gray-300 rounded-md px-2 py-3 text-sm mt-2 bg-gray-100' readOnly />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='text-sm'>Description</label>
            <textarea id='description' name='description' value={profileData.description} onChange={handleChange} className='outline-none w-full resize-none border border-gray-300 rounded-md text-sm px-2 py-3 mt-2' />
          </div>
          <button disabled={loading || !profileData.name || !profileData.username} className={`${loading || !profileData.name || !profileData.username ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} text-white text-sm rounded-md w-full py-2 font-semibold transition`}>
            {
              loading ? 'Loading ...' : 'Save Changes'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
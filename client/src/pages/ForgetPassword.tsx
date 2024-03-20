import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormSubmitted } from '../utils/interface'
import { validEmail } from '../utils/validator'
import HeadInfo from '../utils/HeadInfo'
import useStore from './../store/store'
import { getDataAPI } from '../utils/fetchData'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const { initiate, userState } = useStore()

  const navigate = useNavigate()

  const handleSubmit = async(e: FormSubmitted) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      setLoading(false)
      return initiate('Please provide email address to retrieve reset password link.', 'error')
    }

    if (!validEmail) {
      setLoading(false)
    return initiate('Please provide valid email address to retrieve reset password link.', 'error')
    }

    try {
      const res = await getDataAPI(`/api/v1/users/forgetPassword?email=${email}`)
      setEmail('')
      initiate(res.data.msg, 'success')
    } catch (err: any) {
      initiate(err.response.data.msg, 'error')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (userState.data.accessToken)
      navigate('/')
  }, [navigate, userState.data.accessToken])

  return (
    <>
      <HeadInfo title='Forget Password' />
      <div className='flex min-h-screen max-h-screen'>
        <div className='flex-[2] bg-gray-200 relative md:block hidden'>
          <div className='absolute w-full h-full bg-[rgba(0,0,0,.5)]'></div>
          <img src={`${process.env.PUBLIC_URL}/assets/images/forget-password.jpg`} className='w-full h-full object-cover' alt='Social Sphere' />
        </div>
        <form onSubmit={handleSubmit} className='flex-1 px-12 flex flex-col items-center justify-center'>
          <div className='w-20 h-20'>
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Social Sphere' className='pointer-events-none' />
          </div>
          <h1 className='text-2xl font-semibold mb-10 mt-3'>Forget Password</h1>
          <div className='w-full'>
            <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)} autoComplete='off' placeholder='Email' className='border border-gray-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
          </div>
          <button type='submit' disabled={loading || !email} className={`${loading || !email ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 transition hover:bg-blue-600 cursor-pointer'} text-white outline-none font-semibold w-full rounded-full mt-8 h-10 text-sm`}>
            {
              loading ? 'Loading ...' : 'Send Reset Password Link'
            }
          </button>
          <p className='text-sm mt-5 text-gray-400 font-semibold'>Already have an account yet? Click <Link to='/login' className='outline-none text-blue-500 underline'>here</Link></p>
        </form>
      </div>
    </>
  )
}

export default ForgetPassword
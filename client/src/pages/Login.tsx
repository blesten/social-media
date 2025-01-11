import { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FormChanged, FormSubmitted } from './../utils/interface'
import HeadInfo from '../utils/HeadInfo'
import useStore from './../store/store'

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const { initiate, login, userState } = useStore()

  const navigate = useNavigate()

  const handleChange = (e: FormChanged) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmitted) => {
    e.preventDefault()
    setLoading(true)

    if (!loginData.username || !loginData.password) {
      setLoading(false)
      return initiate('Please provide required field for login purpose.', 'error')
    }

    try {
      await login({
        username: loginData.username,
        password: loginData.password
      })
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
      <HeadInfo title='Sign In' />
      <div className='h-screen'>
        <div className='flex h-full'>
          <div className='flex-[2] bg-gray-200 relative md:block hidden'>
            <div className='absolute w-full h-full bg-[rgba(0,0,0,.5)]'></div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/login.jpg`} className='w-full h-full object-cover' alt='Byte Craft Studio - Social Media' />
          </div>
          <form onSubmit={handleSubmit} className='flex-1 px-12 flex flex-col items-center justify-center'>
            <div className='w-20 h-20'>
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Byte Craft Studio - Social Media' className='pointer-events-none' />
            </div>
            <h1 className='text-2xl font-semibold mb-10 mt-3'>Sign In</h1>
            <div className='w-full'>
              <input type='text' name='username' onChange={handleChange} autoComplete='off' placeholder='Username' className='border border-gray-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
            </div>
            <div className='border w-full mt-6 border-gray-300 rounded-md flex px-2 py-3 items-center gap-4'>
              <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} placeholder='Password' className='flex-1 bg-transparent text-sm outline-none' />
              {
                showPassword
                ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='cursor-pointer text-gray-400' />
                : <AiFillEye onClick={() => setShowPassword(true)} className='cursor-pointer text-gray-400' />
              }
            </div>
            {/* <div className='mt-2 self-end'>
              <Link to='/forget-password' className='hover:underline text-right text-gray-500 text-sm cursor-pointer'>Forget password?</Link>
            </div> */}
            <button type='submit' disabled={loading || !loginData.username || !loginData.password} className={`${loading || !loginData.username || !loginData.password ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} transition text-white outline-none font-semibold w-full rounded-full mt-8 h-10 text-sm`}>
              {
                loading ? 'Loading ...' : 'Sign In'
              }
            </button>
            <p className='text-sm mt-5 text-gray-400 font-semibold'>Don't have an account yet? Click <Link to='/register' className='outline-none text-blue-500 underline'>here</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
import { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FormChanged, FormSubmitted } from './../utils/interface'
import HeadInfo from '../utils/HeadInfo'
import useStore from './../store/store'
import { FaGlobeAmericas } from 'react-icons/fa'

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
          <form onSubmit={handleSubmit} className='flex-1 px-12 flex flex-col items-center justify-center'>
            <FaGlobeAmericas className='text-7xl text-neutral-300' />
            <h1 className='text-2xl text-neutral-300 font-semibold mb-10 mt-3'>Sign In</h1>
            <div className='md:w-1/3 w-full'>
              <input type='text' name='username' onChange={handleChange} autoComplete='off' placeholder='Username' className='border border-neutral-600 bg-zinc-700 text-neutral-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
            </div>
            <div className='border md:w-1/3 w-full mt-6 border-neutral-600 bg-zinc-700 rounded-md flex px-2 py-3 items-center gap-4'>
              <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} placeholder='Password' className='flex-1 bg-transparent text-sm outline-none text-neutral-300' />
              {
                showPassword
                ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='cursor-pointer text-gray-400' />
                : <AiFillEye onClick={() => setShowPassword(true)} className='cursor-pointer text-gray-400' />
              }
            </div>
            <button type='submit' disabled={loading || !loginData.username || !loginData.password} className={`${loading || !loginData.username || !loginData.password ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} transition text-white outline-none font-semibold md:w-1/3 w-full rounded-full mt-10 h-10 text-sm`}>
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
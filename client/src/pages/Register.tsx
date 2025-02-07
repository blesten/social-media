import { useState, useEffect } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FormChanged, FormSubmitted } from '../utils/interface'
import { validEmail, validPassword } from '../utils/validator'
import { postDataAPI } from '../utils/fetchData'
import useStore from './../store/store'
import HeadInfo from '../utils/HeadInfo'
import { FaGlobeAmericas } from 'react-icons/fa'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const { initiate, userState } = useStore()

  const navigate = useNavigate()

  const handleChange = (e: FormChanged) => {
    const { name, value } = e.target
    setRegisterData({ ...registerData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmitted) => {
    e.preventDefault()
    setLoading(true)

    if (!registerData.name || !registerData.username || !registerData.email || !registerData.password || !registerData.passwordConfirmation) {
      setLoading(false)
      return initiate('Please provide required field for registration purpose.', 'error')
    }

    if (!validEmail(registerData.email)) {
      setLoading(false)
      return initiate('Please provide valid email address for registration purpose.', 'error')
    }

    if (!validPassword(registerData.password)) {
      setLoading(false)
      return initiate('Password should be at least 8 characters and should contain capital letter and symbol.', 'error')
    }

    if (registerData.password !== registerData.passwordConfirmation) {
      setLoading(false)
      return initiate('Password confirmation should be matched.', 'error')
    }

    try {
      const res = await postDataAPI('/api/v1/users/register', {
        name: registerData.name,
        email: registerData.email,
        username: registerData.username,
        password: registerData.password
      })
      initiate(res.data.msg, 'success')
      navigate('/login')
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
      <HeadInfo title='Sign Up' />
      <div className='h-screen'>
        <div className='flex h-full'>
          <form onSubmit={handleSubmit} className='flex-1 px-12 flex flex-col items-center justify-center'>
            <FaGlobeAmericas className='text-7xl text-neutral-300' />
            <h1 className='text-2xl text-neutral-300 font-semibold mb-10 mt-3'>Sign Up</h1>
            <div className='md:w-1/3 w-full'>
              <input type='text' name='name' onChange={handleChange} placeholder='Name' autoComplete='off' className='border border-neutral-600 bg-zinc-700 rounded-md w-full text-sm px-2 text-neutral-300 py-3 outline-none' />
            </div>
            <div className='md:w-1/3 w-full mt-6'>
              <input type='text' name='username' onChange={handleChange} placeholder='Username' autoComplete='off' className='border border-neutral-600 rounded-md w-full bg-zinc-700 text-neutral-300 text-sm px-2 py-3 outline-none' />
            </div>
            <div className='md:w-1/3 w-full mt-6'>
              <input type='text' name='email' onChange={handleChange} placeholder='Email' autoComplete='off' className='border border-neutral-600 text-neutral-300 bg-zinc-700 rounded-md w-full text-sm px-2 py-3 outline-none' />
            </div>
            <div className='border md:w-1/3 w-full mt-6 border-neutral-600 rounded-md flex px-2 py-3 items-center gap-4 bg-zinc-700'>
              <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} placeholder='Password' className='flex-1 bg-transparent text-sm outline-none text-neutral-300' />
              {
                showPassword
                ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />
              }
            </div>
            <div className='border md:w-1/3 w-full mt-6 border-neutral-600 bg-zinc-700 rounded-md flex px-2 py-3 items-center gap-4'>
              <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' onChange={handleChange} placeholder='Password Confirmation' className='flex-1 bg-transparent text-sm outline-none text-neutral-300' />
              {
                showPasswordConfirmation
                ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='text-gray-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='text-gray-400 cursor-pointer' />
              }
            </div>
            <button type='submit' disabled={loading || !registerData.name || !registerData.email || !registerData.username || !registerData.password || !registerData.passwordConfirmation} className={`${loading || !registerData.name || !registerData.email || !registerData.username || !registerData.password || !registerData.passwordConfirmation ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} outline-none transition text-white font-semibold md:w-1/3 w-full rounded-full mt-10 h-10 text-sm`}>
              {
                loading ? 'Loading ...' : 'Sign Up'
              }
            </button>
            <p className='outline-none text-sm mt-5 text-gray-400 font-semibold'>Already have an account yet? Click <Link to='/login' className='text-blue-500 underline'>here</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
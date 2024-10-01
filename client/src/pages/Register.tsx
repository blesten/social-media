import { useState, useEffect } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FormChanged, FormSubmitted } from '../utils/interface'
import { validEmail, validPassword } from '../utils/validator'
import { postDataAPI } from '../utils/fetchData'
import useStore from './../store/store'
import HeadInfo from '../utils/HeadInfo'
import Info from '../components/sampleWorks/Info'

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
        <div className='fixed top-0 z-20 w-full'>
          <Info />
        </div>
        <div className='flex h-full'>
          <div className='flex-[2] bg-gray-200 relative md:block hidden'>
            <div className='absolute w-full h-full bg-[rgba(0,0,0,.5)]'></div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/register.jpg`} className='w-full h-full object-cover' alt='Byte Craft Studio - Social Media' />
          </div>
          <form onSubmit={handleSubmit} className='flex-1 px-12 flex flex-col items-center justify-center'>
            <div className='w-20 h-20'>
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Byte Craft Studio - Social Media' className='pointer-events-none' />
            </div>
            <h1 className='text-2xl font-semibold mb-10 mt-3'>Sign Up</h1>
            <div className='w-full'>
              <input type='text' name='name' onChange={handleChange} placeholder='Name' autoComplete='off' className='border border-gray-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
            </div>
            <div className='w-full mt-6'>
              <input type='text' name='username' onChange={handleChange} placeholder='Username' autoComplete='off' className='border border-gray-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
            </div>
            <div className='w-full mt-6'>
              <input type='text' name='email' onChange={handleChange} placeholder='Email' autoComplete='off' className='border border-gray-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
            </div>
            <div className='border w-full mt-6 border-gray-300 rounded-md flex px-2 py-3 items-center gap-4'>
              <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} placeholder='Password' className='flex-1 bg-transparent text-sm outline-none' />
              {
                showPassword
                ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />
              }
            </div>
            <div className='border w-full mt-6 border-gray-300 rounded-md flex px-2 py-3 items-center gap-4'>
              <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' onChange={handleChange} placeholder='Password Confirmation' className='flex-1 bg-transparent text-sm outline-none' />
              {
                showPasswordConfirmation
                ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='text-gray-400 cursor-pointer' />
                : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='text-gray-400 cursor-pointer' />
              }
            </div>
            <button type='submit' disabled={loading || !registerData.name || !registerData.email || !registerData.username || !registerData.password || !registerData.passwordConfirmation} className={`${loading || !registerData.name || !registerData.email || !registerData.username || !registerData.password || !registerData.passwordConfirmation ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} outline-none transition text-white font-semibold w-full rounded-full mt-8 h-10 text-sm`}>
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
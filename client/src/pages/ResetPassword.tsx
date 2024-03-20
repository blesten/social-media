import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import useStore from './../store/store'
import HeadInfo from './../utils/HeadInfo'
import { getDataAPI, patchDataAPI } from '../utils/fetchData'
import { FormSubmitted } from '../utils/interface'
import { validPassword } from '../utils/validator'

const ResetPassword = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const { userState, clear, initiate } = useStore()
  
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e: FormSubmitted) => {
    e.preventDefault()
    setLoading(true)
    await clear()

    if (!password) {
      setLoading(false)
      return initiate('Pleasee provide new password.', 'error')
    } else if (!validPassword(password)) {
      setLoading(false)
      return initiate('Password should be at least 8 characters and should contain capital letter and symbol.', 'error')
    }

    if (password !== passwordConfirmation) {
      setLoading(false)
      return initiate('Password confirmation should be matched.', 'error')
    }

    try {
      const res = await patchDataAPI('/api/v1/users/resetPassword', {
        token,
        password
      })

      navigate('/login')
      await initiate(res.data.msg, 'success')
    } catch (err: any) {
      setLoading(false)
      return initiate(err.response.data.msg, 'error')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (userState.data.accessToken)
      navigate('/')
  }, [navigate, userState.data.accessToken])

  useEffect(() => {
    const checkForgetPasswordTokenValidity = async(token: string) => {
      try {
        await getDataAPI(`/api/v1/users/checkForgetPasswordToken?token=${token}`)
        setAllowed(true)
      } catch (err: any) {
        setAllowed(false)
      }
    }

    if (token)
      checkForgetPasswordTokenValidity(token)
  }, [token])

  return (
    <>
      <HeadInfo title='Reset Password' /> 
      {
        allowed
        ? (
          <div className='px-12 flex items-center justify-center flex-col h-screen overflow-hidden'>
            <div>
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Social Sphere' className='pointer-events-none' />
            </div>
            <form onSubmit={handleSubmit} className='md:w-1/3 w-full'>
              <h1 className='text-center text-xl font-semibold mt-9'>Reset Password</h1>
              <div className='border w-full mt-6 border-gray-300 rounded-md flex px-2 py-3 items-center gap-4'>
                <input type={showPassword ? 'text' : 'password'} name='password' onChange={e => setPassword(e.target.value)} placeholder='Password' className='flex-1 bg-transparent text-sm outline-none' />
                {
                  showPassword
                  ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />
                  : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />
                }
              </div>
              <div className='border w-full mt-6 border-gray-300 rounded-md flex px-2 py-3 items-center gap-4'>
                <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' onChange={e => setPasswordConfirmation(e.target.value)} placeholder='Password Confirmation' className='flex-1 bg-transparent text-sm outline-none' />
                {
                  showPasswordConfirmation
                  ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='text-gray-400 cursor-pointer' />
                  : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='text-gray-400 cursor-pointer' />
                }
              </div>
              <button type='submit' disabled={loading || !password || !passwordConfirmation} className={`${loading || !password || !passwordConfirmation ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} outline-none transition text-white font-semibold w-full rounded-full mt-8 h-10 text-sm`}>
                {
                  loading ? 'Loading ...' : 'Reset Password'
                }
              </button>
            </form>
          </div>
        )
        : (
          <div className='w-screen h-screen flex items-center justify-center flex-col'>
            <Link to='/'>
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Social Sphere' className='pointer-events-none mb-8' />
            </Link>
            <h1 className='text-9xl font-bold text-gray-400'>404</h1>
            <p className='font-semibold text-3xl mt-5'>Resource not found</p>
          </div>
        )
      }
    </>
  )
}

export default ResetPassword
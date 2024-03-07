import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FormChanged } from '../utils/interface'
import HeadInfo from '../utils/HeadInfo'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const handleChange = (e: FormChanged) => {
    const { name, value } = e.target
    setRegisterData({ ...registerData, [name]: value })
  }

  return (
    <>
      <HeadInfo title='Sign Up' />
      <div className='flex min-h-screen max-h-screen'>
        <div className='flex-[2] bg-gray-200 relative'>
          <div className='absolute w-full h-full bg-[rgba(0,0,0,.5)]'></div>
          <img src={`${process.env.PUBLIC_URL}/assets/images/register.jpg`} className='w-full h-full object-cover' alt='Social Sphere' />
        </div>
        <div className='flex-1 px-12 flex flex-col items-center justify-center'>
          <div className='w-20 h-20'>
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Social Sphere' className='pointer-events-none' />
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
          <button className='bg-blue-500 outline-none transition hover:bg-blue-600 text-white font-semibold w-full rounded-full mt-8 h-10 text-sm'>Sign Up</button>
          <p className='outline-none text-sm mt-5 text-gray-400 font-semibold'>Already have an account yet? Click <Link to='/login' className='text-blue-500 underline'>here</Link></p>
        </div>
      </div>
    </>
  )
}

export default Register
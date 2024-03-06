import { AiFillEye } from "react-icons/ai"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className='flex min-h-screen max-h-screen'>
      <div className='flex-[2] bg-gray-200 relative'>
        <div className='absolute w-full h-full bg-[rgba(0,0,0,.5)]'></div>
        <img src={`${process.env.PUBLIC_URL}/assets/images/login.jpg`} className='w-full h-full object-cover' />
      </div>
      <div className='flex-1 px-12 flex flex-col items-center justify-center'>
        <div className='w-20 h-20 bg-gray-100'></div>
        <h1 className='text-2xl font-semibold mb-10 mt-3'>Sign In</h1>
        <div className='w-full'>
          <input type='text' name='username' placeholder='Username' className='border border-gray-300 rounded-md w-full text-sm px-2 py-3 outline-none' />
        </div>
        <div className='border w-full mt-6 border-gray-300 rounded-md flex px-2 py-3 items-center gap-4'>
          <input type='password' name='password' placeholder='Password' className='flex-1 bg-transparent text-sm outline-none' />
          <AiFillEye className='text-gray-400' />
        </div>
        <div className='mt-2 self-end'>
          <p className='text-right text-gray-500 text-sm cursor-pointer'>Forget password?</p>
        </div>
        <button className='bg-blue-500 text-white font-semibold w-full rounded-full mt-8 h-10 text-sm'>Sign In</button>
        <p className='text-sm mt-5 text-gray-400 font-semibold'>Don't have an account yet? Click <Link to='/register' className='text-blue-500 underline'>here</Link></p>
      </div>
    </div>
  )
}

export default Login
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/' className='flex-1 flex items-center gap-4 outline-none'>
      <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='Byte Craft Studio - Social Media' className='w-10' />
      <p className='text-lg font-semibold text-blue-500'>Social Sphere</p>
    </Link>
  )
}

export default Logo
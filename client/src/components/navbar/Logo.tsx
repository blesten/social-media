import { FaGlobeAmericas } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/' className='flex-1 flex items-center gap-3 outline-none text-zinc-300'>
      <FaGlobeAmericas className='text-2xl' />
      <p className='font-semibold'>Social Sphere</p>
    </Link>
  )
}

export default Logo
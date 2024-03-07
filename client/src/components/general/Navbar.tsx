import Logo from './../navbar/Logo'
import Search from './../navbar/Search'
import Utility from './../navbar/Utility'

const Navbar = () => {  
  return (
    <>
      <div className='sticky top-0 shadow-light-gray shadow-sm bg-white w-full px-16 py-5 flex justify-between gap-24 items-center z-10'>
        <Logo />
        <Search />
        <Utility />
      </div>
    </>
  )
}

export default Navbar
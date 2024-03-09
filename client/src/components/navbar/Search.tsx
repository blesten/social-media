import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
  const [keyword, setKeyword] = useState('')

  return (
    <div className='flex-[2] lg:block hidden relative'>
      <div className='flex items-center gap-3 bg-light-gray rounded-full py-3 px-5'>
        <AiOutlineSearch />
        <div className='w-full relative'>
          <input type='text' className='outline-none w-full bg-transparent text-sm' value={keyword} onChange={e => setKeyword(e.target.value)} />
          <p className={`absolute top-0 text-gray-400 text-sm ${keyword.length > 0 ? 'hidden' : 'block'} pointer-events-none`}>Search for friends</p>
        </div>
      </div>
      {/* <div className='absolute top-full left-0 w-full mt-3 bg-white shadow-md border border-gray-200 rounded-md p-4 grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto hide-scrollbar'> */}
        {/* <div className='flex items-center justify-center flex-col text-gray-500'>
          <TbError404 className='text-7xl text-gray-400' />
          <p className='font-semibold text-sm'>No results found</p>
        </div> */}
        {/* <UserCard extraStyle='bg-light-gray p-4 rounded-md mb-0' /> */}
      {/* </div> */}
    </div>
  )
}

export default Search
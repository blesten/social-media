import { useState, useEffect, useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IUser } from './../../utils/interface'
import { getDataAPI } from '../../utils/fetchData'
import { TbError404 } from 'react-icons/tb'
import useStore from './../../store/store'
import UserCard from '../home/UserCard'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [users, setUsers] = useState<IUser[]>([])

  const { userState } = useStore()

  const searchResultRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const searchUser = async(token: string) => {
      try {
        const res = await getDataAPI(`/api/v1/users/search?username=${keyword}`, token)
        setUsers(res.data.users)
      } catch (err: any) {
        console.log(err.response.data.msg)
      }
    }

    if (keyword.length > 3) {
      if (userState.data.accessToken) {
        searchUser(userState.data.accessToken)
      }
    }
  }, [keyword, userState.data.accessToken])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (keyword.length > 3 && searchResultRef.current && !searchResultRef.current.contains(e.target as Node)) {
        setKeyword('')
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [keyword])

  return (
    <div className='flex-[2] lg:block hidden relative'>
      <div className='flex items-center gap-3 bg-light-gray rounded-full py-3 px-5'>
        <AiOutlineSearch />
        <div className='w-full relative'>
          <input type='text' className='outline-none w-full bg-transparent text-sm' value={keyword} onChange={e => setKeyword(e.target.value)} />
          <p className={`absolute top-0 text-gray-400 text-sm ${keyword.length > 0 ? 'hidden' : 'block'} pointer-events-none`}>Search for friends</p>
        </div>
      </div>
      {
        keyword.length > 3 &&
        <div ref={searchResultRef} className='absolute top-full left-0 w-full mt-3 bg-white shadow-md border border-gray-200 rounded-md p-4 grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto hide-scrollbar'>
          {
            users.length < 1
            ? (
              <>
                <div className='flex items-center justify-center flex-col text-gray-500'>
                  <TbError404 className='text-7xl text-gray-400' />
                  <p className='font-semibold text-sm'>No results found</p>
                </div>
              </>
            )
            : (
              <>
                {
                  users.map((item, idx) => (
                    <UserCard
                      user={item}
                      key={idx}
                      extraStyle='bg-light-gray p-4 rounded-md mb-0'
                    />
                  ))
                }
              </>
            )
          }
        </div>
      }
    </div>
  )
}

export default Search
interface IProps {
  extraStyle?: string
}

const UserCard: React.FC<IProps> = ({ extraStyle }) => {
  return (
    <div className={`flex sm:flex-row flex-col sm:items-center sm:justify-between mb-4 ${extraStyle}`}>
      <div className='flex items-center gap-4'>
        <div className='w-14 h-14 rounded-full bg-gray-200' />
        <div>
          <p className='font-semibold text-sm'>John doe</p>
          <p className='text-xs text-gray-500'>@johndoe</p>
        </div>
      </div>
      <button className='bg-blue-500 text-xs sm:mt-0 mt-3 outline-none hover:bg-blue-600 transition text-white font-semibold rounded-md px-4 py-2'>Follow</button>
    </div>
  )
}

export default UserCard
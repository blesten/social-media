const ProfileOverview = () => {
  return (
    <div className='border boder-gray-100 rounded-lg pb-3'>
      <div className='rounded-t-lg bg-gray-200 h-[100px] relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full w-24 h-24 bg-gray-300'></div>
      </div>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='text-center'>
          <p className='text-lg mb-1'>1984</p>
          <p className='text-gray-500 text-xs'>Followers</p>
        </div>
        <div className='text-center'>
          <p className='text-lg mb-1'>2000</p>
          <p className='text-gray-500 text-xs'>Followings</p>
        </div>
      </div>
      <div className='text-center px-7 mt-1'>
        <h1 className='font-semibold mb-1'>Gianna Louis</h1>
        <p className='text-gray-500 text-xs'>@giannalouis</p>
        <p className='text-xs mt-4 leading-relaxed'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, atque.</p>
      </div>
    </div>
  )
}

export default ProfileOverview
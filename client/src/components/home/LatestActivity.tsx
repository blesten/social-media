const LatestActivity = () => {
  return (
    <div className='flex items-center gap-3 mb-7'>
      <div className='w-12 h-12 rounded-full bg-gray-200 shrink-0'></div>
      <div>
        <p className='text-sm'><strong>John Doe</strong> just post a photo, don't miss out</p>
        <p className='text-xs text-gray-400 mt-2'>About an hour ago</p>
      </div>
    </div>
  )
}

export default LatestActivity
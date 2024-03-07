const NotificationCard = () => {
  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-light-gray'>
      <p className='text-sm'><strong>John Doe</strong> just follows you</p>
      <p className='text-gray-500 font-semibold text-xs'>14mins ago</p>
    </div>
  )
}

export default NotificationCard
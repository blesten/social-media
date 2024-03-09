import LatestActivity from './LatestActivity'
import ProfileOverview from './ProfileOverview'

const LeftContent = () => {
  return (
    <div className='xl:flex-1 xl:block hidden h-fit sticky top-28 px-8'>
      <ProfileOverview />
      <div className='mt-7'>
        <p className='font-semibold text-blue-500'>Latest Activity</p>
        <div className='mt-4'>
          <LatestActivity />
          <LatestActivity />
          <LatestActivity />
        </div>
      </div>
    </div>
  )
}

export default LeftContent
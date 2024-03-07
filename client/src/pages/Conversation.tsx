import { FiEdit } from 'react-icons/fi'
import Navbar from './../components/general/Navbar'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoCallOutline, IoSend } from 'react-icons/io5'
import { IoMdAttach } from 'react-icons/io'

const Conversation = () => {
  return (
    <div className='flex flex-col max-h-screen'>
      <Navbar />
      <div className='flex flex-1 overflow-auto border-t border-gray-200'>
        <div className='flex-1 overflow-auto hide-scrollbar'>
          <div className='flex items-center justify-between px-6 py-3'>
            <div className='flex items-center gap-3'>
              <p className='font-semibold text-lg'>Messages</p>
              <div className='w-7 h-7 bg-blue-500 rounded-full text-white font-semibold flex items-center justify-center text-xs'>
                <p>40</p>
              </div>
            </div>
            <div className='w-8 h-8 rounded-md border border-gray-500 flex items-center justify-center'>
              <FiEdit />
            </div>
          </div>
          <div className='px-6 pt-3 pb-5'>
            <div className='flex items-center border border-gray-300 rounded-md px-2 py-2 gap-3'>
              <AiOutlineSearch />
              <input type='text' placeholder='Search' className='outline-none w-full text-sm' />
            </div>
          </div>
          <div>
            <div className='px-6 py-3 hover:bg-gray-100 transition cursor-pointer border-b border-gray-200'>
              <div className='flex items-center gap-5'>
                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                <div className='w-16 h-16 rounded-full bg-gray-200'></div>
                <div className='flex items-center justify-between flex-1'>
                  <div>
                    <p className='text-sm font-semibold'>Phoenix Baker</p>
                    <p className='text-xs text-gray-500'>@phoenix</p>
                  </div>
                  <p className='text-gray-700 text-sm'>5min ago</p>
                </div>
              </div>
              <div className='text-xs text-gray-700 mt-3'>
                <p className='leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ut. Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className='px-6 py-3 hover:bg-gray-100 transition cursor-pointer border-b border-gray-200'>
              <div className='flex items-center gap-5'>
                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                <div className='w-16 h-16 rounded-full bg-gray-200'></div>
                <div className='flex items-center justify-between flex-1'>
                  <div>
                    <p className='text-sm font-semibold'>Phoenix Baker</p>
                    <p className='text-xs text-gray-500'>@phoenix</p>
                  </div>
                  <p className='text-gray-700 text-sm'>5min ago</p>
                </div>
              </div>
              <div className='text-xs text-gray-700 mt-3'>
                <p className='leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ut. Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className='px-6 py-3 hover:bg-gray-100 transition cursor-pointer border-b border-gray-200'>
              <div className='flex items-center gap-5'>
                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                <div className='w-16 h-16 rounded-full bg-gray-200'></div>
                <div className='flex items-center justify-between flex-1'>
                  <div>
                    <p className='text-sm font-semibold'>Phoenix Baker</p>
                    <p className='text-xs text-gray-500'>@phoenix</p>
                  </div>
                  <p className='text-gray-700 text-sm'>5min ago</p>
                </div>
              </div>
              <div className='text-xs text-gray-700 mt-3'>
                <p className='leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ut. Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className='px-6 py-3 hover:bg-gray-100 transition cursor-pointer border-b border-gray-200'>
              <div className='flex items-center gap-5'>
                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                <div className='w-16 h-16 rounded-full bg-gray-200'></div>
                <div className='flex items-center justify-between flex-1'>
                  <div>
                    <p className='text-sm font-semibold'>Phoenix Baker</p>
                    <p className='text-xs text-gray-500'>@phoenix</p>
                  </div>
                  <p className='text-gray-700 text-sm'>5min ago</p>
                </div>
              </div>
              <div className='text-xs text-gray-700 mt-3'>
                <p className='leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ut. Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-[3] bg-gray-50 border-l border-gray-200 flex flex-col'>
          <div className='flex items-center justify-between px-6 py-2 border-b border-gray-200 bg-white'>
            <div className='flex items-center gap-4'>
              <div className='w-16 h-16 rounded-full bg-gray-200'></div>
              <div>
                <div className='flex items-center gap-5'>
                  <p className='text-sm font-semibold mb-2'>Katherine Moss</p>
                  <div className='rounded-md bg-green-200 flex items-center gap-2 py-1 px-2'>
                    <div className='w-2 h-2 rounded-full bg-green-500' />
                    <p className='text-green-500 text-xs font-semibold'>Online</p>
                  </div>
                </div>
                <p className='text-gray-500 text-xs'>@katherine</p>
              </div>
            </div>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-3 bg-blue-100 text-blue-500 font-semibold py-2 rounded-md px-4'>
                <IoCallOutline />
                <p className='text-sm'>Call</p>
              </div>
              <button className='bg-blue-500 text-sm text-white font-semibold px-4 py-2 rounded-md'>View Profile</button>
            </div>
          </div>
          <div className='flex-1 overflow-auto hide-scrollbar px-6 pb-5 flex flex-col'>
            <div className='flex gap-4 mt-10'>
              <div className='w-12 h-12 rounded-full bg-gray-200'></div>
              <div style={{ maxWidth: '45%' }}>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold'>Katherine Moss</p>
                  <p className='text-gray-500 text-xs font-semibold'>11:44 AM</p>
                </div>
                <div className='rounded-md bg-white shadow-md border border-gray-200 px-3 py-2 mt-3'>
                  <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ducimus earum unde sit quia fugit.</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4 mt-10'>
              <div className='w-12 h-12 rounded-full bg-gray-200'></div>
              <div style={{ maxWidth: '45%' }}>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold'>Katherine Moss</p>
                  <p className='text-gray-500 text-xs font-semibold'>11:44 AM</p>
                </div>
                <div className='rounded-md bg-white shadow-md border border-gray-200 px-3 py-2 mt-3'>
                  <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ducimus earum unde sit quia fugit.</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4 justify-end mt-10'>
              <div style={{ maxWidth: '45%' }}>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold'>You</p>
                  <p className='text-gray-500 text-xs font-semibold'>11:45 AM</p>
                </div>
                <div className='rounded-md bg-blue-500 text-white shadow-md px-3 py-2 mt-3'>
                  <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ducimus earum unde sit quia fugit.</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4 justify-end mt-10'>
              <div style={{ maxWidth: '45%' }}>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold'>You</p>
                  <p className='text-gray-500 text-xs font-semibold'>11:45 AM</p>
                </div>
                <div className='rounded-md bg-blue-500 text-white shadow-md px-3 py-2 mt-3'>
                  <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ducimus earum unde sit quia fugit.</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4 justify-end mt-10'>
              <div style={{ maxWidth: '45%' }}>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold'>You</p>
                  <p className='text-gray-500 text-xs font-semibold'>11:45 AM</p>
                </div>
                <div className='rounded-md bg-blue-500 text-white shadow-md px-3 py-2 mt-3'>
                  <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ducimus earum unde sit quia fugit.</p>
                </div>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-200 px-6 py-4 bg-white flex items-center justify-between gap-6'>
            <input type='text' placeholder='Send your message' className='w-full outline-none text-sm rounded-full bg-gray-100 py-2 px-4 border border-gray-300' />
            <div className='flex items-center gap-3'>
              <IoMdAttach className='text-xl text-orange-500' />
              <IoSend className='text-blue-500 text-lg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation
import React from 'react'

const Skeleton = () => {
  return (
    <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
    <li  className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
    <div className='animate-pulse flex flex-col gap-2'>
      <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
        <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gray-300' />
        <div className='flex-1 truncate'>
          <div className='flex items-center space-x-3'>
            <div className='h-6 bg-gray-300 w-36 rounded' />
          </div>
        </div>
      </div>
  
      {/* Details */}
      <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-gray-400'>
        <div className='flex items-center gap-2'>
          <div className='h-4 bg-gray-300 w-12 rounded' />
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 bg-gray-300 w-12 rounded' />
        </div>
        <div className='w-full flex justify-end'>
          <div className='h-4 bg-gray-300 w-8 rounded' />
        </div>
      </div>
    </div>
  </li>
  </ul>
  )
}

export default Skeleton

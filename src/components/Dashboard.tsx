'use client'
import React, { useEffect, useState } from 'react'
import UploadButton from './UploadButton'
import axios from 'axios'
import { Ghost, MessageSquare, Plus, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from './ui/button'
import Skeleton from './Skeleton'
import { toast } from './ui/use-toast'

const Dashboard = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUserData();
  }, [])
  
  const getUserData = async () => {
    setIsLoading(true)
    const user = JSON.parse(localStorage.getItem('user') as any);
    if (user) {
      try {
        const res = await axios.get(`${apiUrl}/api/file/getAllFiles/${user._id}`)
        if (res.data.success) {
          setFiles(res.data.files)
        }
        setIsLoading(false)
      } catch (error:any) {
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'Something went wrong. Please try again',
      })
        setIsLoading(false)
      }
    }
  };

  const handleDelete = async(id:any)=>{
    setIsLoading(true)
    if (id) {
      const res = await axios.delete(`${apiUrl}/api/file/deleteFile/${id}`)
      if (res.data.success) {
      getUserData();
      setIsLoading(false)
      }else{
        setIsLoading(false)
      }
    }
  }

  return (
    <div className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
          My Files
        </h1>
        <UploadButton />
      </div>
      <div className=''>
        {files && files?.length > 0 ? (
          <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
            {files.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((file: any) => (
                <li key={file._id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
                  <Link href={`/dashboard/${file._id}`} className='flex flex-col gap-2'>
                    <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                      <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-violet-600' />
                      <div className='flex-1 truncate'>
                        <div className='flex items-center space-x-3'>
                          <h3 className='truncate text-lg font-medium text-zinc-900'>{file.name}</h3>

                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                    <div className='flex items-center gap-2'>
                      <Plus className='h-4 w-4' />
                      {format(new Date(file.createdAt), "MMM yyyy")}
                    </div>
                    <div className='flex items-center gap-2'>
                      <MessageSquare className='h-4 w-4'/>
                      mocked
                    </div>
                   <Button onClick={()=>{handleDelete(file._id)}} size='sm' className='w-full' variant='destructive'>
                    <TrashIcon className='h-4 w-4'/>
                   </Button>
                  </div>
                </li>
              ))}
          </ul>
        ) : isLoading ? (
          <Skeleton />
        ) : (
          <div className='mt-16 flex flex-col items-center gap-2'>
            <Ghost className='h-8 w-8 text-zinc-800' />
            <h3 className='font-semibold text-xl'>Empty around here</h3>
            <p>Let&apos;s upload tour first PDF.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

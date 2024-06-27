'use client'
import ChatWrapper from '@/components/ChatWrapper'
import PdfRenderer from '@/components/PdfRenderer'
import axios from 'axios'
import { notFound } from 'next/navigation'
import React, { useEffect } from 'react'

interface PageProps {
  params: {
    pid: string
  }
}

const page = ({ params }: PageProps) => {
  const { pid } = params
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getFile = async () => {
    try {
      const file = await axios.get(`${apiUrl}/api/file/getFile/${pid}`)
      if (file.data.success) {
        console.log(file.data.file)
      } else
        notFound()
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        notFound()
      } else if (error.request) {
        // Request made but no response received
        notFound()
      } else {
        notFound()
      }
    }
  }

  useEffect(() => {
    getFile()
  }, [])

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            <PdfRenderer />
          </div>
        </div>
        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
         <ChatWrapper/>
          </div>
      </div>
    </div>
  )
}

export default page

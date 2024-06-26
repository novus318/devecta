'use client'
import ChatWrapper from '@/components/chat/ChatWrapper'
import PdfRenderer from '@/components/PdfRenderer'
import { withAuth } from '@/components/withAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface PageProps {
  params: {
    pid: string
  }
}

const PageComponent = ({ params }: PageProps) => {
  const { pid } = params
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router =useRouter()
  const [file, setFile] = useState<any>({})

  const getFile = async () => {
    try {
      const file = await axios.get(`${apiUrl}/api/file/getFile/${pid}`)
      if (file.data.success) {
        setFile(file.data.file)
      } else
       router.push('/404PageNotFound')
    } catch (error: any) {
      if (error.response) {
       router.push('/404PageNotFound')
      } else if (error.request) {
       router.push('/404PageNotFound')
      } else {
       router.push('/404PageNotFound')
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
            <PdfRenderer url={file?.url}/>
          </div>
        </div>
        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
         <ChatWrapper fileId={file._id} isSubscribed/>
          </div>
      </div>
    </div>
  )
}


const Page = withAuth(({ params }:any) => <PageComponent params={params} />)

export default Page


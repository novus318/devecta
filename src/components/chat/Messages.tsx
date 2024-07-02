'use client'
import { useUser } from '@/context/UserContext'
import axios from 'axios';
import { Loader2, MessageSquare } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Skeleton from '../Skeleton';
import Message from './Message';


interface MessagesProps{
  fileId:string;
}
const Messages = ({fileId}:MessagesProps) => {
  const [combinedMessages, setCombinedMessages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
const {userId} =useUser()
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchMessages =async()=>{
const res = await axios.get(`${apiUrl}/api/message/getFileMessages/${userId}/${fileId}`)
if(res.data.success){
  setCombinedMessages(res.data.messages)
  setTotalCount(res.data.totalCount)
  setIsLoading(false)
}
  }
  useEffect(()=>{
    if(userId && fileId){
      fetchMessages()
    }
  },[])
  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: 'loading-message',
    isUserMessage: false,
    text: (
      <span className='flex h-full items-center justify-center'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </span>
    ),
  }
  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
    {combinedMessages && combinedMessages.length > 0 ? (
      combinedMessages.map((message:any, i:any) => {
        const isNextMessageSamePerson =
          combinedMessages[i - 1]?.isUserMessage ===
          combinedMessages[i]?.isUserMessage

        if (i === combinedMessages.length - 1) {
          return (
            <Message
              message={message}
              isNextMessageSamePerson={
                isNextMessageSamePerson
              }
              key={message.id}
            />
          )
        } else
          return (
            <Message
              message={message}
              isNextMessageSamePerson={
                isNextMessageSamePerson
              }
              key={message.id}
            />
          )
      })
    ) : isLoading ? (
      <div className='w-full flex flex-col gap-2'>
        <Skeleton  />
        <Skeleton  />
        <Skeleton  />
        <Skeleton  />
      </div>
    ) : (
      <div className='flex-1 flex flex-col items-center justify-center gap-2'>
        <MessageSquare className='h-8 w-8 text-green-600' />
        <h3 className='font-semibold text-xl'>
          You&apos;re all set!
        </h3>
        <p className='text-zinc-500 text-sm'>
          Ask your first question to get started.
        </p>
      </div>
    )}
  </div>
)
}

export default Messages

'use client'
import { Loader2, MessageSquare } from 'lucide-react';
import React, { useContext, useEffect, useRef, } from 'react'
import Skeleton from '../Skeleton';
import Message from './Message';
import { ChatContex } from './ChatContext';
import { useIntersection} from '@mantine/hooks';

interface MessagesProps{
  fileId:string;
}
const Messages = ({fileId}:MessagesProps) => {
  const {addMessage,handleInputChange,isLoading,message,fetchNextMessages,combinedMessages,totalCount} = useContext(ChatContex

  )
const lastMessageRef =useRef(null)
const {ref,entry} =useIntersection({
  root: lastMessageRef.current,
  threshold:1
})

useEffect(() => {
  if (entry?.isIntersecting) {
    fetchNextMessages();
  }
}, [entry, fetchNextMessages]);
  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-green scrollbar-thumb-rounded scrollbar-track-green-lighter scrollbar-w-2 scrolling-touch'>
    {combinedMessages && combinedMessages.length > 0 ? (
      combinedMessages.map((message:any, i:any) => {
        const isNextMessageSamePerson =
          combinedMessages[i - 1]?.isUserMessage ===
          combinedMessages[i]?.isUserMessage

        if (i === combinedMessages.length - 1) {
          return (
            <Message
            ref={ref}
              message={message}
              isNextMessageSamePerson={
                isNextMessageSamePerson
              }
              key={message._id}
            />
          )
        } else
          return (
            <Message
              message={message}
              isNextMessageSamePerson={
                isNextMessageSamePerson
              }
              key={message._id}
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

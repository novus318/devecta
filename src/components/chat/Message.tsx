import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { forwardRef } from 'react'
import { Icons } from '../Icons'

interface MessageProps {
  message: {
    _id:string,
    text: string,
    createdAt: string,
    isUserMessage: boolean
  }
  isNextMessageSamePerson: boolean
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
      key={message._id}
        ref={ref}
        className={cn('flex items-end', {
          'justify-end': message.isUserMessage,
        })}>
        <div
          className={cn(
            'relative flex h-6 w-6 aspect-square items-center justify-center',
            {
              'order-2 bg-green-700 rounded-sm':
                message.isUserMessage,
              'order-1 bg-zinc-800 rounded-sm':
                !message.isUserMessage,
              invisible: isNextMessageSamePerson,
            }
          )}>
          {message.isUserMessage ? (
            <Icons.user size={16} className='fill-zinc-200 text-zinc-200' />
          ) : (
            <Icons.logo size={18} className='fill-zinc-300' />
          )}
        </div>

        <div
          className={cn(
            'flex flex-col space-y-2 text-base max-w-md mx-2',
            {
              'order-1 items-end': message.isUserMessage,
              'order-2 items-start': !message.isUserMessage,
            }
          )}>
          <div
            className={cn(
              'px-4 py-2 rounded-lg inline-block',
              {
                'bg-green-600 text-white':
                  message.isUserMessage,
                'bg-gray-200 text-gray-900':
                  !message.isUserMessage,
                'rounded-br-none':
                  !isNextMessageSamePerson &&
                  message.isUserMessage,
                'rounded-bl-none':
                  !isNextMessageSamePerson &&
                  !message.isUserMessage,
              }
            )}>
            {typeof message.text === 'string' ? (
              <ReactMarkdown
                className={cn('prose', {
                  'text-zinc-50': message.isUserMessage,
                })}>
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
            {message._id !== 'loading-message' ? (
              <div
                className={cn(
                  'text-xs select-none mt-2 w-full text-right',
                  {
                    'text-zinc-500': !message.isUserMessage,
                    'text-green-300': message.isUserMessage,
                  }
                )}>
                {format(
                  new Date(message.createdAt),
                  'h:mm a'
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
)

Message.displayName = 'Message'

export default Message
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import Image from 'next/image'
import { Icons } from './Icons'
import Link from 'next/link'

const UserAccountNav = (user:any) => {
  const handleLogout =()=>{
    localStorage.removeItem('user')
    window.location.reload()
  }
  return (
    <DropdownMenu>
    <DropdownMenuTrigger
      asChild
      className='overflow-visible'>
      <Button className='rounded-full h-8 w-8 aspect-square bg-slate-400'>
        <Avatar className='relative w-8 h-8'>
            <AvatarFallback>
              <span className='sr-only'>{user.user.name}</span>
              <Icons.user className='h-4 w-4 text-zinc-900' />
            </AvatarFallback>
        
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className='bg-white' align='end'>
      <div className='flex items-center justify-start gap-2 p-2'>
        <div className='flex flex-col space-y-0.5 leading-none'>
          {user.user.name && (
            <p className='font-medium text-sm text-black'>
              {user.user.name}
            </p>
          )}
          {user.user.email && (
            <p className='w-[200px] truncate text-xs text-zinc-700'>
              {user.user.email}
            </p>
          )}
        </div>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <Link href='/dashboard'>Dashboard</Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className='cursor-pointer'>
          <Button
          onClick={()=>{handleLogout()}} size='sm' variant='secondary' className='w-full'>Log out</Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserAccountNav

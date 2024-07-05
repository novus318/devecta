'use client'
import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'

function NavBar() {
    const [user,setuser]= useState<any>({})
useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('user') as any)
  setuser(user)
},[])
  return (
  <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-100 bg-white/75 backdrop-blur-lg transition-all'>
    <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
<Link href='/' className='flex z-40 font-bold text-lg'><span className='text-green-600'>de</span>vecta</Link>
<MobileNav isAuth={!!user}/>

        <div className='hidden items-center space-x-4 sm:flex'>
         {!user?._id ? (
               <>
               <Link href='/pricing' className={buttonVariants({
                   variant:'ghost',
                   size:'sm',
               })}>
                   Pricing
               </Link>
               <Link
               href='/auth'
               className={buttonVariants({
                   size:'sm',
               })}>
           Get started
               </Link>
               </>
         ):(
            <>
              <Link href='/pricing' className={buttonVariants({
                   variant:'ghost',
                   size:'sm',
               })}>
                   Pricing
               </Link>
               <UserAccountNav user={user}/>
            </>
         )}
        </div>
        </div>
    </MaxWidthWrapper>
  </nav>
  )
}

export default NavBar

"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const UpgradeButton = () => {

 const createStripeSession = ()=>{
    // onSuccess: ({url}:any) => {
    //   window.location.href = url ?? "/dashboard/billing"
    // }
  }

  return (
    <Button onClick={() => createStripeSession()} className='w-full'>
      Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default UpgradeButton
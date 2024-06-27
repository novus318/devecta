'use client'
import Dashboard from '@/components/Dashboard'
import { withAuth } from '@/components/withAuth'
import React from 'react'

const page = () => {
    
    return (
        <Dashboard/>
    )
}

export default withAuth (page)


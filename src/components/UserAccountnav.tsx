'use client'

import Button from '@/app/components/Button'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

const UserAccountnav = () => {
  return (
    <Button danger onClick={() => signOut({
        redirect:true,
        callbackUrl: `${window.location.origin}/auth`
    }
    )}>Sign Out</Button>
  )
}

export default UserAccountnav
'use client'
import React from 'react'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { LinkComponent } from './LinkComponent'

export function Connect() {
  const router = useRouter()
  const { ready, authenticated, logout } = usePrivy()
  const { login } = useLogin({
    // Navigate the user to the dashboard after logging in
    // onComplete: () => router.push("/dashboard"),
  })

  if (!ready) {
    return <span className='loading loading-spinner'></span>
  }

  if (authenticated) {
    return (
      <div className='space-x-4'>
        <LinkComponent href='/invite'>
          <button className='btn btn-ghost'>See Pending Matches</button>
        </LinkComponent>
        <LinkComponent href='/profile'>
          <span className='btn btn-ghost'>Profile</span>
        </LinkComponent>
        <button className='btn' onClick={logout}>
          Log out
        </button>
      </div>
    )
  }

  return (
    <div className='py-4'>
      <button className='btn btn-primary' onClick={login}>
        Log in
      </button>
    </div>
  )
}

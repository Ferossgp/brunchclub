'use client'
import React from 'react'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'

export function Connect() {
  const router = useRouter()
  const { ready, authenticated, logout } = usePrivy()
  const { login } = useLogin({
    // Navigate the user to the dashboard after logging in
    // onComplete: () => router.push("/dashboard"),
  })

  if (!ready) {
    return <div>Loading...</div>
  }

  if (authenticated) {
    return (
      <div className='py-4'>
        <button className='bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg' onClick={logout}>
          Log out
        </button>
      </div>
    )
  }

  return (
    <div className='py-4'>
      <button className='bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg' onClick={login}>
        Log in
      </button>
    </div>
  )
}

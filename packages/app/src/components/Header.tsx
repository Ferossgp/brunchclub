import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'

export function Header() {
  return (
    <div className='container py-4'>
      <header className='navbar bg-base-100 shadow-sm border p-2 rounded-box'>
        <div className='flex-1 px-2 space-x-2'>
          <LinkComponent href='/'>
            <h1 className='text-lg font-bold'>{SITE_NAME}</h1>
          </LinkComponent>
        </div>
        <div className="flex-none">
          <Connect />
        </div>
      </header>
    </div>
  )
}

import React from 'react'
import { SITE_DESCRIPTION } from '@/utils/site'

export function Footer() {
  return (
    <>
      <footer className='sticky top-[100vh] footer flex justify-between items-center bg-neutral text-neutral-content p-4'>
        <p>{SITE_DESCRIPTION}</p>
      </footer>
    </>
  )
}

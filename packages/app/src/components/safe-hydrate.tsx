'use client'

import { useEffect, useState } from 'react'

export const SafeHydrate: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return ready ? children : null
}

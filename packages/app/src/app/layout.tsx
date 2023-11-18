import type { Metadata } from 'next'
import { PropsWithChildren, useEffect, useState } from 'react'
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/site'
import { Layout } from '@/components/Layout'
import { SmartAccountProvider } from '@/context/Web3'
import '../globals.css'
import { SafeHydrate } from '@/components/safe-hydrate'
import { PrivyClientProvider } from '@/context/privy'
import { ReactQueryProvider } from '@/context/react-query'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <SafeHydrate>
          <ReactQueryProvider>
            <PrivyClientProvider>
              <SmartAccountProvider>
                <Layout>{props.children}</Layout>
              </SmartAccountProvider>
            </PrivyClientProvider>
          </ReactQueryProvider>
        </SafeHydrate>
      </body>
    </html>
  )
}

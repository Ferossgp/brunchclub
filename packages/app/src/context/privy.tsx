"use client";

import { baseGoerli } from 'viem/chains'
import { PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation'

export const PrivyClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["email", "google"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: true,
        },
        defaultChain: baseGoerli,
      }
      }
      onSuccess={() => router.push("/dashboard")}
    >
      {children}
    </PrivyProvider>
  )
}
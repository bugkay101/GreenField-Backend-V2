import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";

// Create connectors without WalletConnect to avoid ES module conflicts
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, metaMaskWallet, coinbaseWallet],
    },
  ],
  {
    appName: "agri-mart",
    projectId: "b45c1cdc3d556cfeef7c3526e6197240",
  }
);

const config = createConfig({
  connectors,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: false, // Disable SSR for client-only rendering
});

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  // Create a new QueryClient instance for each user session
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

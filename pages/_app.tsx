import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WishlistProvider } from "@/context/WishlistContext";
import "../styles/globals.css";

// Dynamic import for Web3Provider to disable SSR
const Web3Provider = dynamic(
  () => import("@/components/providers/Web3Provider").then((mod) => ({ default: mod.Web3Provider })),
  {
    ssr: false,
    loading: () => <div>Loading Web3...</div>,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Component {...pageProps} />
        </TooltipProvider>
      </WishlistProvider>
    </Web3Provider>
  );
}

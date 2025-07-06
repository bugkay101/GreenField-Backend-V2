import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, publicActions } from "viem";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "agri-mart",
  projectId: "b45c1cdc3d556cfeef7c3526e6197240",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: false,
});

export const publicClient = config.getClient().extend(publicActions);

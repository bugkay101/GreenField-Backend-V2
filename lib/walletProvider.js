// Dynamic import wrapper for wallet providers
// This handles the CommonJS/ES module interop issues

let walletProvider = null;
let appKit = null;

export const getWalletProvider = async () => {
  if (!walletProvider) {
    try {
      // Dynamic import for ES modules
      const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
      walletProvider = EthereumProvider;
    } catch (error) {
      console.error('Failed to import WalletConnect provider:', error);
      throw error;
    }
  }
  return walletProvider;
};

export const getAppKit = async () => {
  if (!appKit) {
    try {
      // Dynamic import for ES modules
      const reownAppKit = await import('@reown/appkit');
      appKit = reownAppKit;
    } catch (error) {
      console.error('Failed to import Reown AppKit:', error);
      throw error;
    }
  }
  return appKit;
};

// Helper function to initialize providers
export const initializeWalletProviders = async () => {
  try {
    await Promise.all([
      getWalletProvider(),
      getAppKit()
    ]);
    return true;
  } catch (error) {
    console.error('Failed to initialize wallet providers:', error);
    return false;
  }
};

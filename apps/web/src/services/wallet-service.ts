import type { WalletConnection, WalletDescriptor, SupportedWalletConnector } from '@kilimarkets/sdk-injective'
import { connectWallet, getWalletDescriptors, injectiveNetworkConfig } from '@kilimarkets/sdk-injective'

export interface WalletService {
  listWallets(): WalletDescriptor[]
  connect(wallet: SupportedWalletConnector): Promise<WalletConnection>
  disconnect(): Promise<void>
  getNetworkStatus(): { chainId: string; network: string; walletOptions: number }
}

export const createWalletService = (): WalletService => ({
  listWallets: () => getWalletDescriptors(),
  connect: (wallet) => connectWallet(wallet),
  disconnect: async () => undefined,
  getNetworkStatus: () => ({
    chainId: injectiveNetworkConfig.chainId,
    network: injectiveNetworkConfig.network,
    walletOptions: getWalletDescriptors().filter((wallet) => wallet.installed).length,
  }),
})

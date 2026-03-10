import { getEthereumAddress, getInjectiveAddress } from '@injectivelabs/sdk-ts/utils'
import { injectiveNetworkConfig } from '../config/network'
import { getDefaultSubaccountIdForAddress } from '../addresses/subaccount'

export type SupportedWalletConnector = 'keplr' | 'metamask'

export interface WalletDescriptor {
  id: SupportedWalletConnector
  label: string
  installed: boolean
  addressType: 'injective' | 'ethereum'
}

export interface WalletConnection {
  wallet: SupportedWalletConnector
  injectiveAddress: string
  ethereumAddress: string
  subaccountId: string
  chainId: string
}

interface Eip1193Provider {
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>
  isMetaMask?: boolean
}

interface KeplrKey {
  bech32Address: string
  name: string
}

interface KeplrProvider {
  enable(chainId: string): Promise<void>
  getKey(chainId: string): Promise<KeplrKey>
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider
    keplr?: KeplrProvider
  }
}

export const getWalletDescriptors = (): WalletDescriptor[] => [
  {
    id: 'keplr',
    label: 'Keplr',
    installed: typeof window !== 'undefined' && Boolean(window.keplr),
    addressType: 'injective',
  },
  {
    id: 'metamask',
    label: 'MetaMask',
    installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask),
    addressType: 'ethereum',
  },
]

export const connectWallet = async (
  connector: SupportedWalletConnector,
): Promise<WalletConnection> => {
  if (typeof window === 'undefined') {
    throw new Error('Wallet connections require a browser environment')
  }

  if (connector === 'keplr') {
    const keplr = window.keplr
    if (!keplr) {
      throw new Error('Keplr is not installed')
    }

    await keplr.enable(injectiveNetworkConfig.chainId)
    const key = await keplr.getKey(injectiveNetworkConfig.chainId)
    const injectiveAddress = key.bech32Address
    const ethereumAddress = getEthereumAddress(injectiveAddress)

    return {
      wallet: connector,
      injectiveAddress,
      ethereumAddress,
      subaccountId: getDefaultSubaccountIdForAddress(injectiveAddress),
      chainId: injectiveNetworkConfig.chainId,
    }
  }

  const ethereum = window.ethereum
  if (!ethereum) {
    throw new Error('MetaMask is not installed')
  }

  const accounts = (await ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[]

  const ethereumAddress = accounts[0]
  if (!ethereumAddress) {
    throw new Error('MetaMask did not return an account')
  }

  const injectiveAddress = getInjectiveAddress(ethereumAddress)

  return {
    wallet: connector,
    injectiveAddress,
    ethereumAddress,
    subaccountId: getDefaultSubaccountIdForAddress(injectiveAddress),
    chainId: injectiveNetworkConfig.chainId,
  }
}

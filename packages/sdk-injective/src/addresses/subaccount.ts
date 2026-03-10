import {
  getDefaultSubaccountId,
  getEthereumAddress,
  getInjectiveAddress,
  getInjectiveAddressFromSubaccountId,
  getSubaccountId,
} from '@injectivelabs/sdk-ts/utils'

export interface ParsedSubaccountId {
  subaccountId: string
  injectiveAddress: string
  ethereumAddress: string
  nonce: number
}

export const normalizeInjectiveAddress = (address: string) =>
  address.startsWith('inj') ? address : getInjectiveAddress(address)

export const normalizeEthereumAddress = (address: string) =>
  address.startsWith('0x') ? address : getEthereumAddress(address)

export const getDefaultSubaccountIdForAddress = (address: string) =>
  getDefaultSubaccountId(normalizeInjectiveAddress(address))

export const getSubaccountIdForAddress = (address: string, nonce = 0) =>
  getSubaccountId(normalizeInjectiveAddress(address), nonce)

export const parseSubaccountId = (subaccountId: string): ParsedSubaccountId => {
  if (!isValidSubaccountId(subaccountId)) {
    throw new Error('Invalid Injective subaccount ID')
  }

  const injectiveAddress = getInjectiveAddressFromSubaccountId(subaccountId)
  const ethereumAddress = normalizeEthereumAddress(injectiveAddress)
  const nonce = Number.parseInt(subaccountId.slice(-1), 10)

  return {
    subaccountId,
    injectiveAddress,
    ethereumAddress,
    nonce,
  }
}

export const isValidSubaccountId = (value: string) => /^0x[a-fA-F0-9]{64}$/.test(value)

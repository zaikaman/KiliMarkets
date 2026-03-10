export const supportedLanguages = ['en', 'fr', 'sw'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const currencyDisplayModes = ['stablecoin', 'local-reference', 'commodity-unit'] as const
export type CurrencyDisplayMode = (typeof currencyDisplayModes)[number]

export interface LocalizationPreference {
  preferenceId: string
  ownerProfileId: string
  language: SupportedLanguage
  currencyDisplayMode: CurrencyDisplayMode
  updatedAt: string
}

export const languageLabels: Record<SupportedLanguage, string> = {
  en: 'English',
  fr: 'Français',
  sw: 'Kiswahili',
}

export const defaultLocalizationPreference = (): LocalizationPreference => ({
  preferenceId: 'default',
  ownerProfileId: 'guest',
  language: 'en',
  currencyDisplayMode: 'stablecoin',
  updatedAt: new Date(0).toISOString(),
})

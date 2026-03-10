export const supportedCommodities = ['cocoa', 'coffee', 'maize'] as const
export type SupportedCommodity = (typeof supportedCommodities)[number]

export const supportedLanguages = ['en', 'fr', 'sw'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

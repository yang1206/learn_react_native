import i18n from 'i18next'

import { SupportedLanguage } from './constants'
import { preferredLocale } from './helpers/preferredLocale'
import type { Translations } from './en'
import en from './en'
import zh from './zh'

export const LanguageReadable = {
  [SupportedLanguage.ZH]: '简体中文',
  [SupportedLanguage.EN]: 'English',
}

i18n.init({
  compatibilityJSON: 'v3',
  debug: false,
  lng: preferredLocale.languageCode,
  fallbackLng: SupportedLanguage.EN,
  supportedLngs: [SupportedLanguage.EN, SupportedLanguage.ZH],
  nonExplicitSupportedLngs: true,
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
})

export { i18n }

/**
 * Builds up valid keypaths for translations.
 */
export type TextKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text

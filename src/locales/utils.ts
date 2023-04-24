import { useCallback } from 'react'
import { NativeModules } from 'react-native'
import { i18n } from './i18n'
import type { Language } from './resources'
import { getItem, setItem } from '@/utils'

export const LOCAL = 'local'

export function getLanguage() {
  return getItem(LOCAL)
}

export function changeLanguage(lang: Language) {
  i18n.changeLanguage(lang)

  if (__DEV__)
    NativeModules.DevSettings.reload()
  else NativeModules.DevSettings.reload()
}

export function useSelectedLanguage() {
  const setLanguage = useCallback(
    (lang: Language) => {
      setItem(LOCAL, lang)
      if (lang !== undefined)
        changeLanguage(lang as Language)
    },
    [setItem],
  )

  return { language: getLanguage() as Language, setLanguage }
}

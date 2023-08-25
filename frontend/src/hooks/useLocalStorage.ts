import { useCallback } from 'react'

interface LocalStorageFunctions {
  getLocalStorageItem: (key: LocalStorageItems) => any
  setLocalStorageItem: (key: LocalStorageItems, value: any) => void
  removeLocalStorageItem: (key: string) => void
  clearLocalStorage: () => void
}

export enum LocalStorageItems {
  theme = 'theme'
}

export const useLocalStorage = (): LocalStorageFunctions => {
  const getLocalStorageItem = useCallback((key: LocalStorageItems): any => {
    const value = localStorage.getItem(key)
    try {
      const parsedValue = value !== null ? JSON.parse(value) : null
      return parsedValue
    } catch (e) {
      return null
    }
  }, [])

  const setLocalStorageItem = useCallback(
    (key: LocalStorageItems, value: any): void => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    []
  )

  const removeLocalStorageItem = useCallback((key: string): void => {
    localStorage.removeItem(key)
  }, [])

  const clearLocalStorage = useCallback(() => {
    localStorage.clear()
  }, [])

  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorage
  }
}

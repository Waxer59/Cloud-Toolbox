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
  const getLocalStorageItem = (key: LocalStorageItems): any => {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : null
  }
  const setLocalStorageItem = (key: LocalStorageItems, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const removeLocalStorageItem = (key: string): void => {
    localStorage.removeItem(key)
  }
  const clearLocalStorage = (): void => {
    localStorage.clear()
  }
  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorage
  }
}

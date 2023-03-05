import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useLocalStorage, LocalStorageItems } from '../hooks/useLocalStorage'

interface ITheme {
  name: string
  icon: JSX.Element
}

interface IThemes {
  dark: ITheme
  light: ITheme
  [key: string]: any
}

const THEMES: IThemes = {
  dark: {
    name: 'dark',
    icon: <HiMoon className="w-[24px] h-[24px]" />
  },
  light: {
    name: 'light',
    icon: <HiSun className="w-[24px] h-[24px]" />
  }
}

const Navbar: React.FC = () => {
  const { setLocalStorageItem, getLocalStorageItem } = useLocalStorage()
  const [theme, setTheme] = useState<any>(
    THEMES[getLocalStorageItem(LocalStorageItems.theme)] ?? THEMES.light
  )

  const onToggleThemeClick = () => {
    setTheme((el: any) => (el.name === 'dark' ? THEMES.light : THEMES.dark))
  }

  useEffect(() => {
    if (theme?.name !== undefined) {
      setLocalStorageItem(LocalStorageItems.theme, theme.name)
    }
    if (theme.name === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [theme])

  return (
    <nav className="mt-[20px] flex justify-between">
      <h1>
        <Link to="/">
          Cloud<strong>Toolbox</strong>
        </Link>
      </h1>
      <button onClick={onToggleThemeClick}>{theme.icon}</button>
    </nav>
  )
}

export default Navbar

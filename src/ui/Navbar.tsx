import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiSun, HiMoon } from 'react-icons/hi'

const Navbar: React.FC = () => {
  const [togglerIcon, setTogglerIcon] = useState(<HiSun />)

  const onToggleThemeClick = () => {
    setTogglerIcon((el) => (el.type.name === 'HiSun' ? <HiMoon /> : <HiSun />))
  }

  return (
    <nav className="mt-[20px] flex justify-between">
      <h1>
        <Link to="/">
          Cloud<strong>Toolbox</strong>
        </Link>
      </h1>
      <button onClick={onToggleThemeClick}>{togglerIcon}</button>
    </nav>
  )
}

export default Navbar

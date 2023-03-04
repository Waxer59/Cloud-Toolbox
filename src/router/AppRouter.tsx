import { Route, Routes } from 'react-router-dom'
import { Home, TagIt, WebShot } from '../toolboxApp/pages'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/webshot" element={<WebShot />} />
      <Route path="/tagit" element={<TagIt />} />
    </Routes>
  )
}

export default AppRouter

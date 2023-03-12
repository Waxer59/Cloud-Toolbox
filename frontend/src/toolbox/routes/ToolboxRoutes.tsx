import { Routes, Route } from 'react-router-dom'
import {
  WebShotPage,
  BackgroundRemovePage,
  TagItPage,
  IsVirusPage,
  RemoveTextPage
} from '../pages'

const ToolboxRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/webshot" element={<WebShotPage />} />
      <Route path="/backgroundremove" element={<BackgroundRemovePage />} />
      <Route path="/tagit" element={<TagItPage />} />
      <Route path="/isvirus" element={<IsVirusPage />} />
      <Route path="/removetext" element={<RemoveTextPage />} />
    </Routes>
  )
}

export default ToolboxRoutes

import { Route, Routes } from 'react-router-dom'
import {
  HomePage,
  TagItPage,
  WebShotPage,
  BackgroundRemovePage,
  IsVirusPage,
  RemoveTextPage
} from '../toolboxApp/pages'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/webshot" element={<WebShotPage />} />
      <Route path="/backgroundremove" element={<BackgroundRemovePage />} />
      <Route path="/tagit" element={<TagItPage />} />
      <Route path="/isvirus" element={<IsVirusPage />} />
      <Route path="/removetext" element={<RemoveTextPage />} />
    </Routes>
  )
}

export default AppRouter

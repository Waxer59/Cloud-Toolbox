import { Route, Routes } from 'react-router-dom'
import HomePage from '../cloudToolbox/pages/HomePage'
import ToolboxRoutes from '../cloudToolbox/routes/ToolboxRoutes'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<ToolboxRoutes />} />
    </Routes>
  )
}

export default AppRouter

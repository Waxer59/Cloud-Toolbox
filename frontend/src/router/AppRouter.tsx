import { Route, Routes } from 'react-router-dom'
import HomePage from '../toolbox/pages/HomePage'
import ToolboxRoutes from '../toolbox/routes/ToolboxRoutes'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<ToolboxRoutes />} />
    </Routes>
  )
}

export default AppRouter

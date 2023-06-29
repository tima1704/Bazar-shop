import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './pages/Auth'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { MainPage } from './pages/Main'
import NotFound from './components/pageSections/NotFound'

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={< MainPage />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/PrivateRoute';
import './app.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redireciona para o login se a rota não existir */}
        <Route path="/home" element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redireciona para o login se a rota não existir */}
        <Route path="/home" element={<PrivateRoute> <Home/> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
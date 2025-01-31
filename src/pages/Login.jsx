import './index.css'; 
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        // Simulação de autenticação (substitua por uma requisição real no futuro)
        const response = await api.post('/login', { email, password });
        console.log('Login bem-sucedido:', response.data);
  
        // Redireciona para a tela da árvore genealógica
        navigate('/');
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro no login. Verifique suas credenciais.');
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center">
            Não tem uma conta?{' '}
            <span className="text-blue-500 hover:underline">Crie uma aqui</span>
          </p>
          <p className="mt-4 text-center">
          Não tem uma conta? <Link to="/" className="text-blue-500 hover:underline">Voltar para Home</Link></p>
        </div>
      </div>
    );
  }
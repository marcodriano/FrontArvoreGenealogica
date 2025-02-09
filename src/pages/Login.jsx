import './index.css'; 
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
      e.preventDefault();

      
    
      try {
        console.log('E-mail digitado:', email); 
        console.log('Senha digitada:', password);
    
        const response = await api.post('/api/auth/login', { email, password });
        console.log('Resposta do backend:', response.data);
        localStorage.setItem('token', response.data.token);
        // Redireciona para a tela da árvore genealógica
        navigate('/home');
        toast.success('Login bem-sucedido!');
      } catch (error) {
        console.error('Erro no login:', error);
        toast.error('Erro no login. Verifique suas credenciais.');
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
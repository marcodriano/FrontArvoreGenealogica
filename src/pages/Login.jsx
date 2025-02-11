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
      <div className="flex justify-center items-center h-screen bg-green-100 text-center ">
        <div className="bg-green-300 p-8 rounded shadow-md border-1 bg-conic-120 bg-left bg-no-repeat bg-[url(/tree.svg)]">
          <div>
          
          <h1 className=" text-2xl font-bold mb-4">
            Login</h1>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-green-100"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-green-100"
            />
            <button
              type="submit"
              className="border-1 w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>
          
        </div>
      </div>
    );
  }

  /*<p className="mt-4 text-center">
          Não tem uma conta? <Link to="/" className="text-blue-500 hover:underline">Voltar para Home</Link></p>*/
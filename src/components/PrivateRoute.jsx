import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; 

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;
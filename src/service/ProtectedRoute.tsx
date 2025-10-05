import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];
}


const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user , loading } = useAuth();

    if (loading) return <div>Loading...</div>; // wait until user is loaded

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // user role not allowed → redirect based on role
        switch (user.role) {
            case 'user':
                return <Navigate to="/" replace />;
            case 'restaurant':
                return <Navigate to="/restaurant" replace />;
            case 'delivery':
                return <Navigate to="/delivery" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return children;
}


export default ProtectedRoute
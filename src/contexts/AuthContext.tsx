import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import api from '../service/api'


interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        console.log("storedUser",storedUser)
        if (storedUser) setUser(JSON.parse(storedUser));
         setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post('/auth/login', { email, password });
        console.log("data" , res.data)
        const { user } = res.data;
        const {accessToken, refreshToken} = res.data.tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }

     const signup = async (data: any) => {
        const res = await api.post('/auth/signup', data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
    };
 return (
    <AuthContext.Provider value={{ user, login, signup, logout , loading }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => useContext(AuthContext);
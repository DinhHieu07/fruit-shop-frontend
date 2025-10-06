'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { apiGetProfile } from '../service/apiGetProfile';

interface User {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    avatar: string;
    phone?: string;
    address?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname?.() || (typeof window !== 'undefined' ? window.location.pathname : '/');

    // Kiểm tra trạng thái đăng nhập khi app khởi động
    useEffect(() => {
        checkAuthStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const checkAuthStatus = async () => {
        try {
            // Bỏ qua gọi API khi đang ở trang không yêu cầu xác thực
            if (pathname === '/login' || pathname === '/register') {
                setIsLoading(false);
                return;
            }
            // Kiểm tra localStorage trước
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsLoading(false);
                return;
            }

            // Nếu không có trong localStorage, gọi API để kiểm tra
            const response = await apiGetProfile();

            if (response && typeof response === 'object' && response._id) {
                setUser(response);
                localStorage.setItem('user', JSON.stringify(response));
            } else {
                // Nếu API trả về lỗi, xóa user
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('fullname');
        localStorage.removeItem('user_id');
        localStorage.removeItem('avatar');
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; 
import { showToast } from './utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let logoutTimeout = null; 

    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Erreur lors du décodage manuel du JWT:', e);
            return null;
        }
    };

    const isTokenExpired = (token) => {
        try {
            const { exp } = decodeJWT(token); 
            if (!exp) return true; 
            const currentTime = Math.floor(Date.now() / 1000); 
            return exp < currentTime; 
        } catch (e) {
            console.log('Erreur lors de la vérification de l\'expiration du token:', e);
            return true; 
        }
    };

    const scheduleLogout = (token) => {
        if (logoutTimeout) clearTimeout(logoutTimeout); 

        const { exp } = decodeJWT(token);
        if (!exp) return; 

        const currentTime = Math.floor(Date.now() / 1000);
        const delay = (exp - currentTime) * 1000;

        if (delay > 0) {
            logoutTimeout = setTimeout(() => {
                logout();
                showToast('error', 'Session expired', 'Your session has expired. Please log in again.');
            }, delay);
        }
    };

    const checkAuth = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (token && !isTokenExpired(token)) {
                setIsAuthenticated(true);
                scheduleLogout(token); 
            } else {
                setIsAuthenticated(false);
                if (token) {
                    showToast('error', 'Session expired', 'Your session has expired. Please log in again.');
                }
            }
        } catch (e) {
            console.log('Erreur lors de la vérification du token:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();

        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                setIsAuthenticated(false);
            }
        });

        return () => {
            clearTimeout(logoutTimeout);
            unsubscribe();
        };
    }, []);

    const login = async (token) => {
        try {
            await AsyncStorage.setItem('jwtToken', token);
            setIsAuthenticated(true);
            scheduleLogout(token); 
        } catch (e) {
            console.log('Erreur lors de la sauvegarde du token:', e);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            setIsAuthenticated(false);
            if (logoutTimeout) clearTimeout(logoutTimeout); 
        } catch (e) {
            console.log('Erreur lors de la suppression du token:', e);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; 
import { showToast } from './utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.log('Erreur lors de la vérification du token:', e);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                setIsAuthenticated(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const login = async (token) => {
        try {
            await AsyncStorage.setItem('jwtToken', token);
            setIsAuthenticated(true);
        } catch (e) {
            console.log('Erreur lors de la sauvegarde du token:', e);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            setIsAuthenticated(false);
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

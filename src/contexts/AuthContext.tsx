import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { AuthService, UserData } from '../services/AuthService';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  setUser: (user: UserData) => void; // setUser'ı ekle
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        setUser({
          id: firebaseUser.uid,
          ...userDoc.data()
        } as UserData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    setUser, // setUser'ı ekle
    login: async (email: string, password: string) => {
      try {
        const userData = await AuthService.login(email, password);
        setUser(userData);
      } catch (error: any) {
        console.error('Login error:', error);
        throw error;
      }
    },
    register: async (email: string, password: string, displayName: string) => {
      try {
        const userData = await AuthService.register(email, password, displayName);
        setUser(userData);
      } catch (error: any) {
        console.error('Register error:', error);
        throw error;
      }
    },
    logout: async () => {
      await AuthService.logout();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

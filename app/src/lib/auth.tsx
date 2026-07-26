'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from './firebase';

const ADMIN_EMAIL = 'emrekayahan@gmail.com';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      if (email !== ADMIN_EMAIL) {
        throw new Error('Bu e-posta adresi yönetici olarak tanınmıyor.');
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Giriş başarısız.';
      // Firebase error messages in Turkish
      if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password')) {
        setError('E-posta veya şifre hatalı.');
      } else if (message.includes('auth/user-not-found')) {
        setError('Bu e-posta ile kayıtlı kullanıcı bulunamadı.');
      } else if (message.includes('auth/too-many-requests')) {
        setError('Çok fazla başarısız deneme. Lütfen biraz bekleyin.');
      } else {
        setError(message);
      }
      throw err;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

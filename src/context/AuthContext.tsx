import { createContext, useEffect, useState, type ReactNode } from 'react';
import { account } from '../lib/appwrite';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await account.get();
        setUser({
          id: session.$id,
          email: session.email,
          name: session.name,
        });
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await account.create('unique()', email, password, name);
      // Auto sign in after signup
      await account.createEmailSession(email, password);
      setUser({
        id: response.$id,
        email: response.email,
        name: response.name,
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const session = await account.get();
      setUser({
        id: session.$id,
        email: session.email,
        name: session.name,
      });
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

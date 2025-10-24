import { create } from 'zustand';
import { account } from '../lib/appwrite';
import { userService } from '../services/userService';
import type { User } from '../types/auth';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  checkAuth: async () => {
    try {
      const session = await account.get();
      set({
        user: {
          id: session.$id,
          email: session.email,
          name: session.name,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  
  signup: async (email: string, password: string, name: string) => {
    try {
      const response = await account.create('unique()', email, password, name);
      
      // Create user profile in users collection
      try {
        await userService.createUserProfile(response.$id, name, email);
      } catch (profileError) {
        console.error('Failed to create user profile:', profileError);
        // Don't fail signup if profile creation fails
      }
      
      // Auto sign in after signup
      await account.createEmailSession(email, password);
      set({
        user: {
          id: response.$id,
          email: response.email,
          name: response.name,
        },
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
  
  signin: async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const session = await account.get();
      set({
        user: {
          id: session.$id,
          email: session.email,
          name: session.name,
        },
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  },
  
  signout: async () => {
    try {
      await account.deleteSession('current');
      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  },
}));

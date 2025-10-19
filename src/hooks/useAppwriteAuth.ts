import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { appwriteClient } from '../lib/appwrite';

/**
 * Hook to set up Appwrite authentication using Clerk's JWT token
 * Call this at the root level to enable authenticated Appwrite access
 */
export const useAppwriteAuth = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const setupAppwriteAuth = async () => {
      try {
        // Get Clerk's JWT token for Appwrite
        const token = await getToken({ template: 'appwrite' });
        
        if (token) {
          // Authenticate the Appwrite client with the JWT
          appwriteClient.setJWT(token);
        }
      } catch (error) {
        console.error('Failed to set up Appwrite authentication:', error);
      }
    };

    setupAppwriteAuth();
  }, [getToken]);
};

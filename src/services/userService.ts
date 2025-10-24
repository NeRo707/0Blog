import { databases, account } from '../lib/appwrite';
import { APPWRITE_CONFIG } from '../config/constants';
import { Query } from 'appwrite';

const { databaseId, usersCollectionId } = APPWRITE_CONFIG;

export interface UserProfile {
  $id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
}

export const userService = {
  // Create user profile (call this after signup)
  async createUserProfile(userId: string, name: string, email: string): Promise<UserProfile> {
    const doc = await databases.createDocument(
      databaseId,
      usersCollectionId,
      userId, // Use account ID as document ID for easy lookup
      {
        userId,
        name,
        email,
        createdAt: new Date().toISOString(),
      }
    );
    return doc as unknown as UserProfile;
  },

  // Search users by name or email
  async searchUsers(searchTerm: string): Promise<UserProfile[]> {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    try {
      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [
          Query.search('name', searchTerm),
          Query.limit(20),
        ]
      );

      return response.documents as unknown as UserProfile[];
    } catch (error) {
      console.error('Failed to search users:', error);
      return [];
    }
  },

  // Get all users (for listing)
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const currentUser = await account.get();
      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [
          Query.notEqual('userId', currentUser.$id), // Exclude current user
          Query.limit(100),
          Query.orderDesc('createdAt'),
        ]
      );

      return response.documents as unknown as UserProfile[];
    } catch (error) {
      console.error('Failed to get users:', error);
      return [];
    }
  },

  // Get user by ID
  async getUserById(userId: string): Promise<UserProfile | null> {
    try {
      const doc = await databases.getDocument(
        databaseId,
        usersCollectionId,
        userId
      );
      
      return doc as unknown as UserProfile;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  },

  // Check if user profile exists
  async userProfileExists(userId: string): Promise<boolean> {
    try {
      await databases.getDocument(
        databaseId,
        usersCollectionId,
        userId
      );
      return true;
    } catch {
      return false;
    }
  },
};

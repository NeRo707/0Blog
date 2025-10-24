/**
 * Centralized configuration for Appwrite IDs and endpoints
 * These values come from environment variables set in .env
 */

export const APPWRITE_CONFIG = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  blogsCollectionId: import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID,
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  conversationsCollectionId: 'conversations',
  messagesCollectionId: 'messages',
  usersCollectionId: 'users',
} as const;

// Validate required environment variables
Object.entries(APPWRITE_CONFIG).forEach(([key, value]) => {
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
  }
});

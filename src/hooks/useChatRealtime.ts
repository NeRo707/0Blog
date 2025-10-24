import { useEffect } from 'react';
import { appwriteClient } from '../lib/appwrite';
import { APPWRITE_CONFIG } from '../config/constants';
import { useQueryClient } from '@tanstack/react-query';

const { databaseId, conversationsCollectionId, messagesCollectionId } = APPWRITE_CONFIG;

/**
 * Subscribe to real-time updates for conversations and messages
 * This replaces polling and provides instant updates
 */
export const useChatRealtime = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    // Subscribe to message updates
    const messagesUnsubscribe = appwriteClient.subscribe(
      `databases.${databaseId}.collections.${messagesCollectionId}.documents`,
      (response) => {
        // Invalidate queries to refetch fresh data
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          // New message created
          queryClient.invalidateQueries({ queryKey: ['messages'] });
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
          queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        } else if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          // Message updated (e.g., marked as read)
          queryClient.invalidateQueries({ queryKey: ['messages'] });
          queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        }
      }
    );

    // Subscribe to conversation updates
    const conversationsUnsubscribe = appwriteClient.subscribe(
      `databases.${databaseId}.collections.${conversationsCollectionId}.documents`,
      (response) => {
        if (
          response.events.includes('databases.*.collections.*.documents.*.create') ||
          response.events.includes('databases.*.collections.*.documents.*.update')
        ) {
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      messagesUnsubscribe();
      conversationsUnsubscribe();
    };
  }, [userId, queryClient]);
};

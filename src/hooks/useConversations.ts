import { useQuery } from '@tanstack/react-query';
import { chatService } from '../services/chatService';
import { userService } from '../services/userService';
import { useAuthStore } from '../store/authStore';
import type { ConversationWithUser } from '../types/chat';
import { account } from '../lib/appwrite';

export const useConversations = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      const conversations = await chatService.getConversations();
      const currentUser = await account.get();
      
      // Enhance conversations with other user info and unread count
      const enhancedConversations: ConversationWithUser[] = await Promise.all(
        conversations.map(async (conv) => {
          const otherUserId = conv.participantIds.find((id) => id !== currentUser.$id);
          
          // Fetch real user data
          const otherUser = otherUserId ? await userService.getUserById(otherUserId) : null;
          
          // Get unread count for this conversation
          const unreadCount = await chatService.getConversationUnreadCount(conv.$id, currentUser.$id);
          
          return {
            ...conv,
            otherUser: {
              id: otherUserId || '',
              name: otherUser?.name || `User ${otherUserId?.substring(0, 8)}`,
              email: otherUser?.email || '',
            },
            unreadCount,
          };
        })
      );

      return enhancedConversations;
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    // Realtime subscriptions will invalidate this when needed
  });
};

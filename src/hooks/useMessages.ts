import { useQuery } from '@tanstack/react-query';
import { chatService } from '../services/chatService';

export const useMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => chatService.getMessages(conversationId!),
    enabled: !!conversationId,
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    // Realtime subscriptions will invalidate this when needed
  });
};

import { useQuery } from '@tanstack/react-query';
import { chatService } from '../services/chatService';
import { useAuthStore } from '../store/authStore';

export const useUnreadCount = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['unreadCount', user?.id],
    queryFn: () => chatService.getUnreadCount(),
    enabled: !!user,
    staleTime: 1000 * 30, // Consider data fresh for 30 seconds
    // Realtime subscriptions will invalidate this when needed
  });
};

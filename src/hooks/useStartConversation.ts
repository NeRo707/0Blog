import { useMutation } from '@tanstack/react-query';
import { chatService } from '../services/chatService';
import { useChatStore } from '../store/chatStore';

export const useStartConversation = () => {
  const { setSelectedConversation, setIsOpen } = useChatStore();

  return useMutation({
    mutationFn: async (otherUserId: string) => {
      return chatService.getOrCreateConversation(otherUserId);
    },
    onSuccess: (conversation) => {
      setSelectedConversation(conversation);
      setIsOpen(true);
    },
  });
};

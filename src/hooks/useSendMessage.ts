import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '../services/chatService';
import { useChatStore } from '../store/chatStore';

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { addMessage, selectedConversation } = useChatStore();

  return useMutation({
    mutationFn: async ({
      conversationId,
      receiverId,
      content,
    }: {
      conversationId: string;
      receiverId: string;
      content: string;
    }) => {
      return chatService.sendMessage(conversationId, receiverId, content);
    },
    onSuccess: (newMessage) => {
      // Add message to local state
      addMessage(newMessage);
      
      // Invalidate conversations to update last message
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      
      // Invalidate messages to refetch
      if (selectedConversation) {
        queryClient.invalidateQueries({ 
          queryKey: ['messages', selectedConversation.$id] 
        });
      }
    },
  });
};

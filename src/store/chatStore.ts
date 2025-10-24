import { create } from 'zustand';
import type { Conversation, Message, ConversationWithUser } from '../types/chat';

interface ChatStore {
  isOpen: boolean;
  selectedConversation: Conversation | null;
  conversations: ConversationWithUser[];
  messages: Message[];

  // Actions
  setIsOpen: (isOpen: boolean) => void;
  setSelectedConversation: (conversation: Conversation | null) => void;
  setConversations: (conversations: ConversationWithUser[]) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  selectedConversation: null,
  conversations: [],
  messages: [],

  setIsOpen: (isOpen) => set({ isOpen }),

  setSelectedConversation: (conversation) => 
    set({ selectedConversation: conversation }),

  setConversations: (conversations) => 
    set({ conversations }),

  setMessages: (messages) => 
    set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),

  reset: () =>
    set({
      isOpen: false,
      selectedConversation: null,
      conversations: [],
      messages: [],
    }),
}));

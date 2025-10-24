import type { Models } from 'appwrite';

export interface Conversation extends Models.Document {
  participantIds: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  createdAt: string;
}

export interface Message extends Models.Document {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface ConversationWithUser extends Conversation {
  otherUser: {
    id: string;
    name: string;
    email: string;
  };
  unreadCount: number;
}

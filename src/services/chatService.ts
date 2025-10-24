import { databases, account } from '../lib/appwrite';
import { APPWRITE_CONFIG } from '../config/constants';
import { ID, Query } from 'appwrite';
import type { Conversation, Message } from '../types/chat';

const { databaseId, conversationsCollectionId, messagesCollectionId } = APPWRITE_CONFIG;

export const chatService = {
  // Get or create a conversation between two users
  async getOrCreateConversation(otherUserId: string): Promise<Conversation> {
    const currentUser = await account.get();
    const participantIds = [currentUser.$id, otherUserId].sort();

    // Try to find existing conversation
    // We need to check that participantIds contains exactly these two users
    const response = await databases.listDocuments(
      databaseId,
      conversationsCollectionId,
      [
        Query.equal('participantIds', participantIds[0]),
        Query.equal('participantIds', participantIds[1]),
      ]
    );

    // Filter to ensure exact match (only 2 participants, no more)
    const exactMatch = response.documents.find((doc) => {
      const docParticipants = (doc as unknown as Conversation).participantIds;
      return docParticipants.length === 2 &&
             docParticipants.includes(participantIds[0]) &&
             docParticipants.includes(participantIds[1]);
    });

    if (exactMatch) {
      return exactMatch as unknown as Conversation;
    }

    // Create new conversation
    const newConversation = await databases.createDocument(
      databaseId,
      conversationsCollectionId,
      ID.unique(),
      {
        participantIds,
        createdAt: new Date().toISOString(),
      }
    );

    return newConversation as unknown as Conversation;
  },

  // Get all conversations for current user
  async getConversations(): Promise<Conversation[]> {
    const currentUser = await account.get();
    
    const response = await databases.listDocuments(
      databaseId,
      conversationsCollectionId,
      [
        Query.search('participantIds', currentUser.$id),
        Query.orderDesc('lastMessageTime'),
        Query.limit(100),
      ]
    );

    return response.documents as unknown as Conversation[];
  },

  // Send a message
  async sendMessage(conversationId: string, receiverId: string, content: string): Promise<Message> {
    const currentUser = await account.get();
    const now = new Date().toISOString();

    // Create message
    const message = await databases.createDocument(
      databaseId,
      messagesCollectionId,
      ID.unique(),
      {
        conversationId,
        senderId: currentUser.$id,
        receiverId,
        content,
        read: false,
        createdAt: now,
      }
    );

    // Update conversation with last message
    await databases.updateDocument(
      databaseId,
      conversationsCollectionId,
      conversationId,
      {
        lastMessage: content.substring(0, 100),
        lastMessageTime: now,
      }
    );

    return message as unknown as Message;
  },

  // Get messages for a conversation
  async getMessages(conversationId: string): Promise<Message[]> {
    const response = await databases.listDocuments(
      databaseId,
      messagesCollectionId,
      [
        Query.equal('conversationId', conversationId),
        Query.orderDesc('createdAt'),
        Query.limit(100),
      ]
    );

    return response.documents as unknown as Message[];
  },

  // Mark messages as read
  async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    const messages = await databases.listDocuments(
      databaseId,
      messagesCollectionId,
      [
        Query.equal('conversationId', conversationId),
        Query.equal('receiverId', userId),
        Query.equal('read', false),
      ]
    );

    // Update all unread messages
    await Promise.all(
      messages.documents.map((msg) =>
        databases.updateDocument(
          databaseId,
          messagesCollectionId,
          msg.$id,
          { read: true }
        )
      )
    );
  },

  // Get unread message count for current user
  async getUnreadCount(): Promise<number> {
    try {
      const currentUser = await account.get();
      const response = await databases.listDocuments(
        databaseId,
        messagesCollectionId,
        [
          Query.equal('receiverId', currentUser.$id),
          Query.equal('read', false),
          Query.limit(100),
        ]
      );
      return response.total;
    } catch (error) {
      console.error('Failed to get unread count:', error);
      return 0;
    }
  },

  // Get unread count for specific conversation
  async getConversationUnreadCount(conversationId: string, userId: string): Promise<number> {
    try {
      const response = await databases.listDocuments(
        databaseId,
        messagesCollectionId,
        [
          Query.equal('conversationId', conversationId),
          Query.equal('receiverId', userId),
          Query.equal('read', false),
        ]
      );
      return response.total;
    } catch (error) {
      console.error('Failed to get conversation unread count:', error);
      return 0;
    }
  },
};

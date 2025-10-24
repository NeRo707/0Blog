import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useMessages } from '../../hooks/useMessages';
import { useSendMessage } from '../../hooks/useSendMessage';
import { useAuthStore } from '../../store/authStore';
import { chatService } from '../../services/chatService';
import type { Conversation } from '../../types/chat';
import { formatDistanceToNow } from '../../utils/utils';

interface ChatWindowProps {
  conversation: Conversation;
}

export const ChatWindow = ({ conversation }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();
  const { data: messages, isLoading } = useMessages(conversation.$id);
  const sendMessageMutation = useSendMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUserId = conversation.participantIds.find((id) => id !== user?.id);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (user?.id) {
      chatService.markMessagesAsRead(conversation.$id, user.id)
        .catch(error => console.error('Failed to mark messages as read:', error));
    }
  }, [conversation.$id, user?.id, messages]); // Re-run when new messages arrive

  const handleSend = async () => {
    if (!message.trim() || !otherUserId) return;

    try {
      await sendMessageMutation.mutateAsync({
        conversationId: conversation.$id,
        receiverId: otherUserId,
        content: message.trim(),
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Messages List */}
      <List
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <div ref={messagesEndRef} />
        {messages && messages.length > 0 ? (
          [...messages].map((msg) => {
            const isOwnMessage = msg.senderId === user?.id;
            return (
              <ListItem
                key={msg.$id}
                sx={{
                  display: 'flex',
                  justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                  px: 0,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: isOwnMessage ? 'primary.main' : 'grey.100',
                    color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      opacity: 0.7,
                      fontSize: '0.7rem',
                    }}
                  >
                    {formatDistanceToNow(msg.createdAt)}
                  </Typography>
                </Paper>
              </ListItem>
            );
          })
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        )}
      </List>

      {/* Message Input */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          disabled={sendMessageMutation.isPending}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!message.trim() || sendMessageMutation.isPending}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Button, CircularProgress, Badge } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useConversations } from '../../hooks/useConversations';
import { useChatStore } from '../../store/chatStore';
import { formatDistanceToNow } from './utils';

interface ConversationListProps {
  onNewChat: () => void;
}

export const ConversationList = ({ onNewChat }: ConversationListProps) => {
  const { data: conversations, isLoading } = useConversations();
  const { setSelectedConversation } = useChatStore();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* New Chat Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onNewChat}
        >
          New Chat
        </Button>
      </Box>

      {/* Conversations List */}
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {conversations && conversations.length > 0 ? (
          conversations.map((conv) => (
            <ListItem key={conv.$id} disablePadding>
              <ListItemButton onClick={() => setSelectedConversation(conv)}>
                <Badge 
                  badgeContent={conv.unreadCount} 
                  color="error"
                  sx={{ width: '100%' }}
                >
                  <ListItemText
                    sx={{ width: '100%' }}
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ 
                            fontWeight: conv.unreadCount > 0 ? 600 : 400 
                          }}
                        >
                          {conv.otherUser.name}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box component="span">
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: conv.unreadCount > 0 ? 500 : 400,
                          }}
                        >
                          {conv.lastMessage || 'No messages yet'}
                        </Typography>
                        {conv.lastMessageTime && (
                          <Typography component="span" variant="caption" color="text.secondary">
                            {formatDistanceToNow(conv.lastMessageTime)}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </Badge>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No conversations yet. Start a new chat!
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

import { useState } from 'react';
import { 
  Fab, 
  Badge, 
  Drawer, 
  Box, 
  IconButton, 
  Typography,
  Paper,
} from '@mui/material';
import { 
  ChatBubble as ChatIcon, 
  Close as CloseIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { useUnreadCount } from '../../hooks/useUnreadCount';
import { useChatRealtime } from '../../hooks/useChatRealtime';
import { useAuthStore } from '../../store/authStore';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { UserSearchDialog } from './UserSearchDialog';

export const ChatBubble = () => {
  const { isOpen, setIsOpen, selectedConversation, setSelectedConversation } = useChatStore();
  const { user } = useAuthStore();
  const { data: unreadCount = 0 } = useUnreadCount();
  const [searchOpen, setSearchOpen] = useState(false);

  // Subscribe to realtime updates
  useChatRealtime(user?.id);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedConversation(null);
  };

  const handleBack = () => {
    setSelectedConversation(null);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 1000,
        }}
        onClick={handleToggle}
      >
        <Badge badgeContent={unreadCount} color="error">
          <ChatIcon />
        </Badge>
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            height: '100vh',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {selectedConversation && (
                <IconButton size="small" onClick={handleBack}>
                  <BackIcon />
                </IconButton>
              )}
              <Typography variant="h6">
                {selectedConversation ? 'Chat' : 'Messages'}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Paper>

          {/* Content */}
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            {selectedConversation ? (
              <ChatWindow conversation={selectedConversation} />
            ) : (
              <ConversationList onNewChat={() => setSearchOpen(true)} />
            )}
          </Box>
        </Box>
      </Drawer>

      {/* User Search Dialog */}
      <UserSearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

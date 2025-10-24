import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useStartConversation } from '../../hooks/useStartConversation';
import { userService } from '../../services/userService';
import type { UserProfile } from '../../services/userService';

interface UserSearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export const UserSearchDialog = ({ open, onClose }: UserSearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const startConversationMutation = useStartConversation();

  // Fetch all users on mount, or search when term changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (searchTerm.trim().length >= 2) {
          const results = await userService.searchUsers(searchTerm);
          setUsers(results);
        } else {
          // Show all users if no search term
          const allUsers = await userService.getAllUsers();
          setUsers(allUsers);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [searchTerm, open]);

  const handleSelectUser = async (userId: string) => {
    try {
      await startConversationMutation.mutateAsync(userId);
      onClose();
      setSearchTerm('');
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">New Chat</Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          autoFocus
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {users.length > 0 ? (
              users.map((user) => (
                <ListItem key={user.$id} disablePadding>
                  <ListItemButton onClick={() => handleSelectUser(user.userId)}>
                    <ListItemText primary={user.name} secondary={user.email} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  {searchTerm ? 'No users found' : 'No other users available'}
                </Typography>
              </Box>
            )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

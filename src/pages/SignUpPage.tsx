import { useNavigate } from 'react-router';
import { Container, Box, TextField, Button, Typography, Card, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpMutation } from '../hooks/useAuthMutations';
import { signUpSchema, type SignUpFormData } from '../types/auth.validation';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useSignUpMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
        setError('email', {
          type: 'manual',
          message: errorMessage,
        });
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            disabled={isPending}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
          
          <TextField
            label="Email"
            type="email"
            fullWidth
            disabled={isPending}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            disabled={isPending}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#5568d3' },
              mt: 2,
            }}
          >
            {isPending ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <Button
            color="primary"
            onClick={() => navigate('/sign-in')}
            sx={{ textTransform: 'none', fontSize: 'inherit' }}
          >
            Sign In
          </Button>
        </Typography>
      </Card>
    </Container>
  );
}

import { useNavigate } from 'react-router';
import { Container, Box, TextField, Button, Typography, Card, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation } from '../hooks/useAuthMutations';
import { signInSchema, type SignInFormData } from '../types/auth.validation';

export default function SignInPage() {
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useSignInMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    signIn(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
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
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            color="primary"
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            {isPending ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Button
            color="primary"
            onClick={() => navigate('/sign-up')}
            sx={{ textTransform: 'none', fontSize: 'inherit' }}
          >
            Sign Up
          </Button>
        </Typography>
      </Card>
    </Container>
  );
}

import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import type { SignInFormData, SignUpFormData } from '../types/auth.validation';

export const useSignInMutation = () => {
  const { signin } = useAuth();
  
  return useMutation({
    mutationFn: async (data: SignInFormData) => {
      return signin(data.email, data.password);
    },
  });
};

export const useSignUpMutation = () => {
  const { signup } = useAuth();
  
  return useMutation({
    mutationFn: async (data: SignUpFormData) => {
      return signup(data.email, data.password, data.name);
    },
  });
};

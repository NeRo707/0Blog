import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signup = useAuthStore((state) => state.signup);
  const signin = useAuthStore((state) => state.signin);
  const signout = useAuthStore((state) => state.signout);

  return {
    user,
    isLoading,
    isAuthenticated,
    signup,
    signin,
    signout,
  };
}

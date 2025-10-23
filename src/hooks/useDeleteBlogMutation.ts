import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBlog } from '../services/blogService';

export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: string) => deleteBlog(blogId),
    onSuccess: () => {
      // Invalidate all blog-related queries
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['userBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
  });
}

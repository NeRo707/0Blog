import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlog } from '../services/blogService';
import type { Blog } from '../types/blog';

export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { blogId: string; updates: Partial<Omit<Blog, 'id'>> }) =>
      updateBlog(data.blogId, data.updates),
    onSuccess: () => {
      // Invalidate all blog-related queries
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['userBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
  });
}

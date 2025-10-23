import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlog } from '../services/blogService';
import { useBlogStore } from '../store/blogStore';
import type { Blog } from '../types/blog';

export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();
  const { closeEditDialog } = useBlogStore();

  return useMutation({
    mutationFn: (data: { blogId: string; updates: Partial<Omit<Blog, 'id'>> }) =>
      updateBlog(data.blogId, data.updates),
    onSuccess: () => {
      // Invalidate all blog-related queries
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['userBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      
      // Close edit dialog
      closeEditDialog();
    },
  });
}

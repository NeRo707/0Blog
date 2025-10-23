import { useMutation, useQueryClient } from '@tanstack/react-query';
import { databases } from '../lib/appwrite';
import { APPWRITE_CONFIG } from '../config/constants';
import type { Blog } from '../types/blog';

const createBlogMutation = async (blogData: Omit<Blog, 'id'>) => {
  return databases.createDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.blogsCollectionId,
    'unique()',
    {
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content || '',
      image: blogData.image,
      category: blogData.category,
      readTime: blogData.readTime,
      author: blogData.author,
      authorId: blogData.authorId,
      date: blogData.date,
    }
  );
};

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogMutation,
    onSuccess: () => {
      // Invalidate blog queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

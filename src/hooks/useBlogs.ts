import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { fetchBlogs, fetchBlogsByCategory, searchBlogs } from '../services/blogService';
import type { Blog } from '../types/blog';

/**
 * Hook to fetch all blogs
 * Requires authenticated user
 */
export const useBlogs = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch blogs by category
 * Requires authenticated user
 */
export const useBlogsByCategory = (category: string | null) => {
  const { isAuthenticated } = useAuth();

  return useQuery<Blog[]>({
    queryKey: ['blogs', 'category', category],
    queryFn: () => fetchBlogsByCategory(category || ''),
    enabled: isAuthenticated && category !== null,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook to search blogs
 * Requires authenticated user
 */
export const useSearchBlogs = (query: string | null) => {
  const { isAuthenticated } = useAuth();

  return useQuery<Blog[]>({
    queryKey: ['blogs', 'search', query],
    queryFn: () => searchBlogs(query || ''),
    enabled: isAuthenticated && query !== null && query.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

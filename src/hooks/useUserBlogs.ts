import { useQuery } from '@tanstack/react-query';
import { fetchBlogsByAuthor } from '../services/blogService';

export function useUserBlogs(authorName: string | undefined) {
  return useQuery({
    queryKey: ['userBlogs', authorName],
    queryFn: () => fetchBlogsByAuthor(authorName!),
    enabled: !!authorName,
  });
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Full blog content/body
  image: string;
  author: string;
  authorId: string; // Unique user ID from Appwrite Account
  date: string;
  category: string;
  readTime: string;
}
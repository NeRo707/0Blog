import { databases } from '../lib/appwrite';
import { Query } from 'appwrite';
import { APPWRITE_CONFIG } from '../config/constants';
import type { Blog } from '../types/blog';

/**
 * Fetch all blogs from Appwrite database
 */
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      image: doc.image as string,
      author: doc.author as string,
      date: doc.date as string,
      category: doc.category as string,
      readTime: doc.readTime as string,
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

/**
 * Fetch blogs filtered by category
 */
export const fetchBlogsByCategory = async (category: string): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      [Query.equal('category', category)]
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      image: doc.image as string,
      author: doc.author as string,
      date: doc.date as string,
      category: doc.category as string,
      readTime: doc.readTime as string,
    }));
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    throw error;
  }
};

/**
 * Search blogs by title or excerpt
 */
export const searchBlogs = async (query: string): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      [
        Query.search('title', query),
      ]
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      image: doc.image as string,
      author: doc.author as string,
      date: doc.date as string,
      category: doc.category as string,
      readTime: doc.readTime as string,
    }));
  } catch (error) {
    console.error('Error searching blogs:', error);
    throw error;
  }
};

/**
 * Fetch a single blog by ID
 */
export const fetchBlogById = async (blogId: string): Promise<Blog> => {
  try {
    const doc = await databases.getDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      blogId
    );

    return {
      id: doc.$id,
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      image: doc.image as string,
      author: doc.author as string,
      date: doc.date as string,
      category: doc.category as string,
      readTime: doc.readTime as string,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

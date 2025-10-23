import { databases } from "../lib/appwrite";
import { Query } from "appwrite";
import type { Models } from "appwrite";
import { APPWRITE_CONFIG } from "../config/constants";
import type { Blog } from "../types/blog";

// Define the structure of your Appwrite document
interface BlogDocument extends Models.Document {
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  authorId: string;
  date: string;
  category: string;
  readTime: string;
}

/**
 * Helper function to map Appwrite document to Blog type
 */
const mapDocToBlog = (doc: BlogDocument): Blog => ({
  id: doc.$id,
  title: doc.title,
  excerpt: doc.excerpt,
  content: doc.content,
  image: doc.image,
  author: doc.author,
  authorId: doc.authorId,
  date: doc.date,
  category: doc.category,
  readTime: doc.readTime,
});

/**
 * Fetch all blogs from Appwrite database
 */
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments<BlogDocument>(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId
    );

    return response.documents.map(mapDocToBlog);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

/**
 * Fetch blogs filtered by category
 */
export const fetchBlogsByCategory = async (
  category: string
): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments<BlogDocument>(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      [Query.equal("category", category)]
    );

    return response.documents.map(mapDocToBlog);
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    throw error;
  }
};

/**
 * Search blogs by title or excerpt
 */
export const searchBlogs = async (query: string): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments<BlogDocument>(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      [Query.search("title", query)]
    );

    return response.documents.map(mapDocToBlog);
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
};

/**
 * Fetch a single blog by ID
 */
export const fetchBlogById = async (blogId: string): Promise<Blog> => {
  try {
    const doc = await databases.getDocument<BlogDocument>(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      blogId
    );

    return mapDocToBlog(doc);
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

/**
 * Fetch blogs by author (using authorId for security)
 */
export const fetchBlogsByAuthor = async (authorId: string): Promise<Blog[]> => {
  try {
    const response = await databases.listDocuments<BlogDocument>(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      [Query.equal("authorId", authorId)]
    );

    return response.documents.map(mapDocToBlog);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    throw error;
  }
};

/**
 * Update a blog post
 */
export const updateBlog = async (
  blogId: string,
  updates: Partial<Omit<Blog, "id">>
): Promise<Blog> => {
  try {
    const doc = await databases.updateDocument<BlogDocument>(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      blogId,
      updates
    );

    return mapDocToBlog(doc);
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

/**
 * Delete a blog post
 */
export const deleteBlog = async (blogId: string): Promise<void> => {
  try {
    await databases.deleteDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.blogsCollectionId,
      blogId
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

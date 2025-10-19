export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface BlogDocument extends Blog {
  $id: string;
  $createdAt?: string;
  $updatedAt?: string;
}

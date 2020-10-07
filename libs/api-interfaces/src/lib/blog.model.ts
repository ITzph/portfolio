export interface Blog {
  id: number;
  content: string;
  author: string;
  tags: string[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
  coverPhoto: string;
}

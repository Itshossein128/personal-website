// app/admin/blogs/page.tsx
import { getDb } from '@/lib/db';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

export default async function AdminBlogsPage() {
  const db = await getDb();
  const blogs = await db.collection<BlogPost>('blogs').find({}).toArray();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin: Manage Blogs</h1>
      <Link href="/admin/blogs/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Blog
      </Link>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 rounded">
            <h2 className="text-xl">{blog.title}</h2>
            <p>{blog.content.slice(0, 100)}...</p>
            <p>Likes: {blog.likes} | Comments: {blog.comments.length}</p>
            <Link href={`/admin/blogs/edit/${blog._id}`} className="text-blue-500">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
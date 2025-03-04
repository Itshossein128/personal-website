// app/api/blogs/route.ts
import { getDb } from '@/lib/db';
import { BlogPost } from '@/types/blog';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = request.headers.get('adminToken')?.replace('Bearer ', '');
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  console.log(token, ADMIN_TOKEN);

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const { title, content } = await request.json();

    const newBlog: BlogPost = {
      title,
      content,
      images: [],
      createdAt: new Date(),
    };

    const result = await db.collection<BlogPost>('blogs').insertOne(newBlog);
    return NextResponse.json({ id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const blogs = await db.collection<BlogPost>('blogs').find({}).limit(10).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
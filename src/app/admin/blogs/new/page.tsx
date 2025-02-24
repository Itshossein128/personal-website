// app/admin/blogs/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { post } from '@/services/httpService';

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  // Set the cookie on mount (for testing; ideally, do this after login)
  useEffect(() => {
    document.cookie = `authToken=ADMIN_TOKEN=${process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'my-super-secret-admin-key-2025'}; path=/`;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post('/blogs', { title, content }, { authenticated: true });
      router.push('/admin/blogs');
    } catch (error) {
      alert('Failed to create blog');
    }
  };

  // Rest of your form...
}
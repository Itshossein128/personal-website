// app/admin/blogs/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/services/httpService";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  // Set the cookie on mount (for testing; ideally, do this after login)
  // useEffect(() => {
  //   document.cookie = `authToken=ADMIN_TOKEN=${
  //     process.env.NEXT_PUBLIC_ADMIN_TOKEN || "my-super-secret-admin-key-2025"
  //   }; path=/`;
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post("/blogs", { title, content }, { authenticated: true });
      router.push("/admin/blogs");
    } catch (error) {
      console.log(error)
      alert("Failed to create blog");
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create New Blog</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='title' className='block'>
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div>
          <label htmlFor='content' className='block'>
            Content
          </label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full p-2 border rounded'
            rows={5}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Save Blog
        </button>
      </form>
    </div>
  );
}

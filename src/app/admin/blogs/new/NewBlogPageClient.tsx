"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
// @ts-expect-error there is an unknown error in this package that seems like it's unresolvable
import Embed from "@editorjs/embed";
// @ts-expect-error there is an unknown error in this package that seems like it's unresolvable
import Link from "@editorjs/link";
import List from "@editorjs/list";
import { post } from "@/services/httpService";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const editorInstance = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!editorInstance.current && editorContainerRef.current) {
      editorInstance.current = new EditorJS({
        holder: editorContainerRef.current,
        tools: {
          header: Header,
          paragraph: Paragraph,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload", // endpoint سرور برای آپلود فایل
                byUrl: "/api/upload?url=true", // endpoint برای آپلود از URL
              },
              additionalRequestHeaders: {
                Authorization: "Bearer your-token-here", // اگه نیاز به احراز هویت دارید
              },
            },
          },
          quote: Quote,
          embed: {
            class: Embed,
            config: { services: { youtube: true } },
          },
          list: List,
          link: Link,
        },
        placeholder: "Start writing your blog content here...",
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current?.destroy?.();
          })
          .catch((e) => console.error("Error during cleanup:", e))
          .finally(() => {
            editorInstance.current = null;
          });
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!editorInstance.current) return;

      const savedData = await editorInstance.current.save();
      const content = JSON.stringify(savedData);

      await post("/blogs", { title, content }, { authenticated: true });
      router.push("/admin/blogs");
    } catch (error) {
      console.log(error);
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
          <label className='block'>Content</label>
          <div
            ref={editorContainerRef}
            className='w-full p-2 border rounded min-h-[200px]'
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

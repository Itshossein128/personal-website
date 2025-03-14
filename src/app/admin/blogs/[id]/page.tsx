"use client"; // اضافه کردن این خط برای تبدیل به Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // اضافه کردن useParams

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  likes: number;
}

// تابع کمکی برای رندر محتوای کامل EditorJS
function renderFullEditorJSContent(content: string): JSX.Element {
  try {
    const data = JSON.parse(content);
    if (!data || !data.blocks || !Array.isArray(data.blocks)) {
      return <p className="text-gray-500">No content available...</p>;
    }

    const blocks = data.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "header":
          const HeadingTag = `h${block.data.level || 2}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} className="font-bold mb-4">
              {block.data.text || ""}
            </HeadingTag>
          );
        case "paragraph":
          return (
            <p key={index} className="mb-4">
              {block.data.text || ""}
            </p>
          );
        case "image":
          return (
            <img
              key={index}
              src={block.data.file?.url || ""}
              alt={block.data.caption || ""}
              width={800} // تنظیم اندازه پیش‌فرض
              height={400} // تنظیم اندازه پیش‌فرض
              className="max-w-full h-auto mb-4 rounded"
            />
          );
        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 pl-4 mb-4 italic text-gray-700"
            >
              {block.data.text || ""}
              {block.data.caption && (
                <cite className="block mt-2">— {block.data.caption}</cite>
              )}
            </blockquote>
          );
        case "embed":
          return (
            <iframe
              key={index}
              src={block.data.embed}
              width="100%"
              height="315"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="mb-4 rounded"
            />
          );
        case "list":
          return block.data.style === "ordered" ? (
            <ol key={index} className="list-decimal pl-5 mb-4">
              {block.data.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          ) : (
            <ul key={index} className="list-disc pl-5 mb-4">
              {block.data.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        case "link":
          return (
            <a
              key={index}
              href={block.data.link}
              className="text-blue-500 hover:underline mb-4 block"
            >
              {block.data.meta?.title || block.data.link}
            </a>
          );
        default:
          return null;
      }
    });

    return <div>{blocks}</div>;
  } catch (error) {
    console.error("Error parsing EditorJS content:", error);
    return <p className="text-red-500">Error loading content...</p>;
  }
}

export default function BlogDetailPage() {
  const params = useParams(); // استفاده از useParams برای دریافت params
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!params?.id) return; // چک کردن وجود id
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`);
        if (!response.ok) throw new Error("Blog not found");
        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [params?.id]);

  if (!blog) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      <div className="prose max-w-none">
        {renderFullEditorJSContent(blog.content)}
      </div>
    </div>
  );
}
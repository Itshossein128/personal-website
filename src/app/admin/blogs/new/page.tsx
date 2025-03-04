'use client'
import dynamic from "next/dynamic";

const NewBlogPage = dynamic(() => import("./NewBlogPageClient"), {
  ssr: false, // غیرفعال کردن Server-Side Rendering
  loading: () => <div>Loading...</div>, // نمایش لودینگ در زمان بارگذاری
});

export default function BlogNewWrapper() {
  return <NewBlogPage />;
}
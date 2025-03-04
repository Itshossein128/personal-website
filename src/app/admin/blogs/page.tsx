import { getDb } from "@/lib/db";
import { BlogPost } from "@/types/blog";
import Link from "next/link";

// تابع رندر محتوای EditorJS برای پیش‌نمایش
function renderEditorJSContent(content: string): JSX.Element {
  try {
    const data = JSON.parse(content);
    if (!data || !data.blocks || !Array.isArray(data.blocks)) {
      return <p className='text-gray-500'>No content available...</p>;
    }

    const blocks = data.blocks.slice(0, 1).map((block: any, index: number) => {
      switch (block.type) {
        case "header":
          const HeadingTag = `h${
            block.data.level || 2
          }` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} className='font-bold mb-2'>
              {block.data.text || ""}
            </HeadingTag>
          );
        case "paragraph":
          return (
            <p key={index} className='mb-2'>
              {block.data.text || ""}
            </p>
          );
        case "image":
          return (
            <img
              key={index}
              src={block.data.file?.url || ""}
              alt={block.data.caption || ""}
              className='max-w-full h-auto mb-2'
            />
          );
        case "quote":
          return (
            <blockquote key={index} className='border-l-4 pl-4 mb-2 italic'>
              {block.data.text || ""}
              {block.data.caption && (
                <cite className='block mt-1'>— {block.data.caption}</cite>
              )}
            </blockquote>
          );
        case "embed":
          return (
            <iframe
              key={index}
              src={block.data.embed}
              width='100%'
              height='315'
              frameBorder='0'
              allowFullScreen
              className='mb-2'
            />
          );
        case "list":
          return block.data.style === "ordered" ? (
            <ol key={index} className='list-decimal pl-5 mb-2'>
              {block.data.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          ) : (
            <ul key={index} className='list-disc pl-5 mb-2'>
              {block.data.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });

    const textPreview =
      data.blocks
        .map((block: any) => block.data.text || block.data.caption || "")
        .join(" ")
        .slice(0, 100) + "...";

    return (
      <div>
        {blocks}
        {textPreview && <p className='text-gray-600'>{textPreview}</p>}
      </div>
    );
  } catch (error) {
    console.error("Error parsing EditorJS content:", error);
    return <p className='text-red-500'>Error loading content...</p>;
  }
}

export default async function AdminBlogsPage() {
  const db = await getDb();
  const blogs = await db.collection<BlogPost>("blogs").find({}).toArray();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Admin: Manage Blogs</h1>
      <Link
        href='/admin/blogs/new'
        className='bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block'
      >
        Create New Blog
      </Link>
      <ul className='space-y-4'>
        {blogs.map((blog) => (
          <li key={blog._id.toString()} className='border p-4 rounded'>
            <Link href={`/admin/blogs/${blog._id}`}>
              <h2 className='text-xl text-blue-500 hover:underline'>
                {blog.title}
              </h2>
            </Link>
            {renderEditorJSContent(blog.content)}
            <Link
              href={`/admin/blogs/edit/${blog._id}`}
              className='text-blue-500'
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

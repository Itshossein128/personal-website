import { getDb } from "@/lib/db";
import { BlogPost } from "@/types/blog";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const db = await getDb();
    const blog = await db.collection<BlogPost>("blogs").findOne({
      _id: new ObjectId(params.id),
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // تبدیل _id به رشته برای جلوگیری از مشکلات سریال‌سازی
    const blogResponse = {
      ...blog,
      _id: blog._id.toString(),
    };

    return NextResponse.json(blogResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
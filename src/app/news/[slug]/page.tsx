import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { marked } from "marked";

type PostProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "data/news"));
  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default function PostPage({ params }: PostProps) {
  const { slug } = params;
  const fullPath = path.join(process.cwd(), "data/news", `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return notFound();
  }

  const file = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(file);

  const html = marked(content);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-500 mb-6">{data.date}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}

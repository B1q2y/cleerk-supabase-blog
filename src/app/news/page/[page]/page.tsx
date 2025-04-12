import { getNewsData } from "@/lib/news";
import Link from "next/link";
import BackToHome from "@/components/BackToHome";

type Props = {
  params: {
    page: string;
  };
};

export default async function Page({ params }: Props) {
  const pageNum = parseInt(params.page);
  const { posts, pages } = await getNewsData(pageNum);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">記事一覧 - ページ {pageNum}</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="p-4 bg-white rounded shadow">
            <Link href={`/news/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-6">
        {pages.map((page) => (
          <Link
            key={page}
            href={`/news/page/${page}`}
            className={`px-4 py-2 rounded ${
              page === pageNum
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
      <BackToHome />
    </main>
  );
}

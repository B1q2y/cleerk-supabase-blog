import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
// 記事の場所を指定
const postsDirectory = path.join(process.cwd(), "data/news");

// 投稿数
const PAGE_SIZE = 5;

// ページ数を計算する関数
const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

// 記事データの型定義
type PostData = {
  slug: string;
  title: string;
  date: string;
  isPublished?: boolean;
};

// 記事一覧データを取得する関数
export async function getNewsData(page: number = 1) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, ""); // ファイル名から.mdを削除
      const fullPath = path.join(postsDirectory, fileName); // ファイルの場所を取得
      const fileContents = fs.readFileSync(fullPath, "utf-8"); // ファイルの内容を取得
      const matterResult = matter(fileContents); // ファイルの内容を解析
      return {
        slug, // ファイル名
        ...(matterResult.data as Omit<PostData, "slug">), // メタデータ
      };
    })
    .filter((post) => post.isPublished !== false); // 公開された記事のみ

  // 投稿を日付でソート
  const sortedPosts = allPostsData.sort((postA, postB) =>
    new Date(postA.date) > new Date(postB.date) ? -1 : 1
  );

  // ページネーション処理
  const pages = range(1, Math.ceil(allPostsData.length / PAGE_SIZE));
  const posts = sortedPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    posts,
    pages,
  };
}

type NewsProps = {
  params: {
    page?: string;
  };
};

const News = async ({ params }: NewsProps) => {
  const currentPage = params.page ? parseInt(params.page) : 1;
  const { posts, pages } = await getNewsData(currentPage);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/news/${post.slug}`}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p>Pages:</p>
        <ul>
          {pages.map((page) => (
            <li key={page}>
              <Link href={`/news/page/${page}`}>{page}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "data/news");
const PAGE_SIZE = 5;

const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export type PostData = {
  slug: string;
  title: string;
  date: string;
  isPublished?: boolean;
};

export async function getNewsData(page: number = 1) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const matterResult = matter(fileContents);
      return {
        slug,
        ...(matterResult.data as Omit<PostData, "slug">),
      };
    })
    .filter((post) => post.isPublished !== false);

  const sortedPosts = allPostsData.sort((a, b) =>
    new Date(a.date) > new Date(b.date) ? -1 : 1
  );

  const pages = range(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const posts = sortedPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    posts,
    pages,
  };
}

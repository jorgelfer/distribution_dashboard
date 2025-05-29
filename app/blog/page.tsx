import Link from "next/link";

export default function Blog() {
  return (
    <main>
      <h1>Blog</h1>
      <p>This is the blog page.</p>
      <p>
        <Link href="/blog/post-1">Go to Post 1</Link>
      </p>
      <p>
        <Link href="/blog/post-2">Go to Post 2</Link>
      </p>
    </main>
  );
}

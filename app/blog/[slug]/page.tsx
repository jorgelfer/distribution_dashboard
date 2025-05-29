type PageProps = {
  params: {
    slug: string;
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const BlogPostPage: React.FC<PageProps> = (params) => {
  //   const { id } = await params;
  return (
    <main>
      <h1>Blog Post</h1>
      <p>Slug: {id}</p>
      <p>This is a blog post page.</p>
      <p>Here you can read the content of the blog post.</p>
      <p>Feel free to explore more posts!</p>
    </main>
  );
};

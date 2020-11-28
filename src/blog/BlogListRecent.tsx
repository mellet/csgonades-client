import { FC, memo } from "react";
import { BlogPost } from "./BlogPost";
import { BlogPostPreviewHorizontal } from "./BlogPostPreviewHorizontal";

type Props = {
  posts: BlogPost[];
};

export const BlogListRecent: FC<Props> = memo(({ posts }) => {
  return (
    <>
      <div className="blog-post-list">
        {posts.map((bp) => (
          <BlogPostPreviewHorizontal key={bp.title} blogPost={bp} />
        ))}
      </div>
    </>
  );
});

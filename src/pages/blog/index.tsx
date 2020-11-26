import { FC } from "react";
import { BlogList } from "../../blog/BlogList";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { SEO } from "../../layout/SEO";
import { Dimensions } from "../../constants/Constants";
import {
  bestDust2Nades,
  blogJumpthrowBind,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
  blogTickrateAndJumpthrow,
} from "../../blog/ArticleData/blogPosts";

const BlogPage: FC = () => {
  const { colors } = useTheme();
  const blogPosts = [
    blogJumpthrowBind,
    bestDust2Nades,
    blogNadeAlignCrosshair,
    blogPractiseConfig,
    blogTickrateAndJumpthrow,
  ];

  return (
    <>
      <SEO title="Blog" canonical="/blog" />
      <div className="blog-posts">
        <h1>Blog</h1>
        <BlogList posts={blogPosts} />
      </div>
      <style jsx>{`
        .blog-posts {
          color: ${colors.TEXT};
          grid-area: main;
          margin-top: 30px;
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        h1 {
          font-weight: 300;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          font-size: 32px;
        }
      `}</style>
    </>
  );
};

export default BlogPage;

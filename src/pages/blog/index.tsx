import { FC } from "react";
import { blogTickrateAndJumpthrow } from "./tickrate-and-jumpthrow-bind";
import { BlogList } from "../../blog/BlogList";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { SEO } from "../../layout/SEO";
import { blogPractiseConfig } from "./practice-config";
import { blogNadeAlignCrosshair } from "./smoke-align-crosshair";
import { bestDust2Nades } from "./best-dust2-nades";
import { blogJumpthrowBind } from "./jumpthrow-bind";
import { PageCentralize } from "../../common/PageCentralize";
import { Dimensions } from "../../constants/Constants";

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
      <PageCentralize>
        <div className="blog-posts">
          <h1>Blog</h1>
          <BlogList posts={blogPosts} />
        </div>
      </PageCentralize>
      <style jsx>{`
        .blog-posts {
          color: ${colors.TEXT};
          grid-area: main;
          margin-top: 30px;
          margin-bottom: 100px;
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

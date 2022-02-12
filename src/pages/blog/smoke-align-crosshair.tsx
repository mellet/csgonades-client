import { FC } from "react";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { blogNadeAlignCrosshair } from "../../blog/ArticleData/blogPosts";
import { NadeAlignCrosshairPost } from "../../blog-pages/NadeAlignCrosshairPost";

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<NadeAlignCrosshairPost />}
      sidebar={<BlogDefaultSidebar data={blogNadeAlignCrosshair} />}
    />
  );
};

export default NadeAlignCrosshairBlogPost;

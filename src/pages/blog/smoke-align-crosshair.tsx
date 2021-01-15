import { FC } from "react";
import { BlogDefaultSidebar } from "../../blog/BlogDefaultSidebar";
import { NadeAlignCrosshairPost } from "../../blog/blogposts/NadeAlignCrosshairPost";
import { HeaderDefault } from "../../layout/defaultheader/Header";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { blogNadeAlignCrosshair } from "../../blog/ArticleData/blogPosts";

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

import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { blogPractiseConfig } from "../../blog/ArticleData/blogPosts";
import { PractiseConfigBlogPost } from "../../blog-pages/PracticeConfig";

const PractiseConfigBlogPostPage = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<PractiseConfigBlogPost />}
      sidebar={<BlogDefaultSidebar data={blogPractiseConfig} />}
    />
  );
};

export default PractiseConfigBlogPostPage;

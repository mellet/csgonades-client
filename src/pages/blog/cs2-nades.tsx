import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { cs2Nades } from "../../blog/ArticleData/blogPosts";
import { Cs2NadesBlogPost } from "../../blog-pages/Cs2Smoke";

const BestDust2NadesBlogPostPage = (): JSX.Element => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<Cs2NadesBlogPost />}
      sidebar={<BlogDefaultSidebar data={cs2Nades} />}
    />
  );
};

export default BestDust2NadesBlogPostPage;

import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { recordingNades } from "../../blog/ArticleData/blogPosts";
import { RecordingNadesBlogPost } from "../../blog-pages/RecordingNades";

const RecordingNadesBlogPostPage = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<RecordingNadesBlogPost />}
      sidebar={<BlogDefaultSidebar data={recordingNades} />}
    />
  );
};

export default RecordingNadesBlogPostPage;

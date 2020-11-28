import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../utils/DateUtils";
import { BlogPost } from "./BlogPost";
import { PageLink } from "../common/PageLink";

type Props = {
  blogPost: BlogPost;
};

export const BlogPostPreviewHorizontal: FC<Props> = ({ blogPost }) => {
  const { colors } = useTheme();

  const { thumbnailUrl, intro, title } = blogPost;

  return (
    <>
      <PageLink href={`/blog/${blogPost.slug}`} as={`/blog/${blogPost.slug}`}>
        <div className="blog-post-preview">
          <div className="blog-img"></div>

          <div className="content">
            <h3>{title}</h3>
            <p>{intro}</p>
            <div className="actions">
              <span className="blog-post-date">
                {prettyDate(blogPost.createdAt)}
              </span>
              <span className="actions-read-more">Read more</span>
            </div>
          </div>
        </div>
      </PageLink>
      <style jsx>{`
        .blog-post-preview {
          background: ${colors.DP01};
          border-radius: 5px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          color: ${colors.TEXT};
          display: flex;
          font-size: 18px;
          margin-bottom: 50px;
          overflow: hidden;
          width: 100%;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          margin-left: 30px;
          margin-right: 30px;
        }

        .content {
          align-items: stretch;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .content p {
          color: #545454;
          color: ${colors.TEXT};
          flex: 1;
          font-size: 18px;
          margin-bottom: 30px;
          padding: 0px 30px;
        }

        .blog-img {
          background-position: center;
          background-size: cover;
          background: url(${thumbnailUrl});
          width: 40%;
        }

        .actions-read-more {
          color: ${colors.PRIMARY};
          font-weight: normal;
        }

        .actions-read-more:hover {
          text-decoration: underline;
        }

        .blog-post-preview h3 {
          color: #545454;
          color: ${colors.TEXT};
          font-size: 20px;
          font-weight: 400;
          margin: 0;
          padding: 15px 30px;
        }

        .blog-post-date {
          color: #bbb;
          font-size: 16px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

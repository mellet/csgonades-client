import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../utils/DateUtils";
import { BlogPost } from "./BlogPost";
import { PageLink } from "../common/PageLink";

type Props = {
  blogPost: BlogPost;
};

export const BlogPostPreview: FC<Props> = ({ blogPost }) => {
  const { colors } = useTheme();

  const { thumbnailUrl, intro, title } = blogPost;

  return (
    <>
      <div className="blog-post-preview">
        <PageLink href={`/blog/${blogPost.slug}`} as={`/blog/${blogPost.slug}`}>
          <span>
            <div className="blog-img"></div>

            <h3>{title}</h3>
          </span>
        </PageLink>

        <p>{intro}</p>

        <div className="actions">
          <PageLink
            href={`/blog/${blogPost.slug}`}
            as={`/blog/${blogPost.slug}`}
          >
            <span className="actions-read-more">Read more</span>
          </PageLink>
          <span className="blog-post-date">
            {prettyDate(blogPost.createdAt)}
          </span>
        </div>
      </div>
      <style jsx>{`
        .actions {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          margin-left: 30px;
          margin-right: 30px;
        }

        .blog-img {
          background-position: center;
          background-size: cover;
          background: url(${thumbnailUrl});
          height: 200px;
        }

        .actions-read-more {
          color: ${colors.PRIMARY};
          font-weight: normal;
        }

        .actions-read-more:hover {
          text-decoration: underline;
        }

        .blog-post-preview {
          background: ${colors.DP01};
          border-radius: 5px;
          border-radius: 5px;
          box-shadow: ${colors.SHADOW};
          color: ${colors.TEXT};
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100%;
        }

        .blog-post-preview p {
          flex: 1;
        }

        .blog-post-preview img {
          display: inline-block;
          max-width: 100%;
        }

        .blog-post-preview h3 {
          color: #545454;
          color: ${colors.TEXT};
          font-size: 20px;
          font-weight: 400;
          margin: 0;
          padding: 15px 30px;
          text-align: center;
        }

        .blog-post-preview p {
          color: #545454;
          color: ${colors.TEXT};
          font-size: 16px;
          margin-bottom: 15px;
          padding: 0px 30px;
        }

        .blog-post-date {
          color: #bbb;
          font-size: 14px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

import { FC, memo, FunctionComponent } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";
import { BlogPost } from "../models/BlogPost";
import { Dimensions } from "../../constants/Constants";
import { prettyDate } from "../../utils/DateUtils";
import { BlogAuthor } from "./BlogAuthor";
import { SEO } from "../../shared-components/SEO";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify } from "../../utils/Common";
import Image from "next/image";

type Props = {
  data: BlogPost;
  SideBarComp?: FunctionComponent;
};

export const BlogPostArticle: FC<Props> = memo(({ children, data }) => {
  const { colors } = useTheme();

  return (
    <>
      <ArticleJsonLd
        url={`https://www.csgonades.com/blog/${data.slug}`}
        authorName="Mellet Solbakk"
        datePublished={data.createdAt}
        dateModified={data.updatedAt || data.createdAt}
        description={descriptionSimplify(data.intro)}
        images={[data.imageUrl]}
        publisherLogo="https://www.csgonades.com/logo.png"
        publisherName="CSGO Nades"
        title={data.title}
      />
      <SEO
        title={data.title}
        canonical={`/blog/${data.slug}`}
        description={data.intro}
        thumbnail={data.thumbnailUrl}
      />

      <article id="blog-article">
        <div id="title-image">
          <Image
            priority
            src={data.imageUrl}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div id="article-title">
            <h1>{data.title}</h1>
          </div>
          {!!data.imageCredit && !!data.imageCreditUrl && (
            <div className="image-credit">
              Photo by{" "}
              <a href={data.imageCreditUrl} target="_top">
                {data.imageCredit}
              </a>
            </div>
          )}
        </div>

        <div id="article-content">
          <div className="article-date">{prettyDate(data.createdAt)}</div>
          <p className="lead">{data.intro}</p>
          {children}
          <BlogAuthor />
        </div>
      </article>

      <style jsx>{`
        #blog-article {
          color: ${colors.TEXT};
          display: grid;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-areas: "title-img" "article";
          grid-template-columns: 1fr;
          grid-template-rows: min-content min-content min-content min-content;
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        #title-image {
          border-radius: ${Dimensions.BORDER_RADIUS};
          grid-area: title-img;
          height: 50vh;
          overflow: hidden;
          position: relative;
        }

        #article-title {
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          align-items: flex-end;
          background: rgba(0, 0, 0, 0.2);
          background: linear-gradient(
            180deg,
            rgba(17, 17, 17, 0) 0%,
            rgba(32, 32, 32, 0.4) 100%
          );
          color: white;
          display: flex;
          padding: 30px 30px;
          z-index: 1;
          height: 40%;
        }

        #article-title h1 {
          font-size: 32px;
          font-weight: 300;
        }

        .sticky {
          position: sticky;
          top: calc(${Dimensions.NAV_HEIGHT}px + ${Dimensions.GUTTER_SIZE}px);
        }

        .spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #article-content {
          background: ${colors.DP01};
          border-radius: 5px;
          grid-area: article;
          max-width: 100%;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        #blog-sidebar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .article-date {
          color: #bbb;
          margin-bottom: 15px;
        }

        #article-image {
          position: relative;
          grid-area: image;
          width: 100%;
          padding-bottom: 40%;
          border-radius: 5px;
          overflow: hidden;
          background: url(${data.imageUrl});
          background-size: cover;
          background-position: center;
        }

        .image-credit {
          position: absolute;
          bottom: 15px;
          right: 15px;
          text-align: right;
          font-style: italic;
          background: rgba(255, 255, 255, 0.8);
          color: #111;
          padding: 10px;
          border-radius: 5px;
        }

        .image-credit a {
          color: ${colors.PRIMARY};
        }

        .image-credit a:hover {
          text-decoration: underline;
        }

        @media only screen and (max-width: 600px) {
          #blog-article {
            margin: 0px;
          }
        }
      `}</style>
    </>
  );
});

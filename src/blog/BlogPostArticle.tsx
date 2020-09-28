import { FC, memo, FunctionComponent } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogPost } from "./BlogPost";
import { Dimensions } from "../constants/Constants";
import { prettyDate } from "../utils/DateUtils";
import { BlogAuthor } from "./BlogAuthor";
import { NadeShareActions } from "../nades/NadeShareActions";
import { SEO } from "../layout/SEO";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify } from "../utils/Common";
import { LayoutWithSidebar } from "../common/LayoutWithSidebar";
import { SidebarSkyskraperAd } from "../common/adunits/SidebarSkyskraper";

type Props = {
  data: BlogPost;
  SideBarComp?: FunctionComponent;
};

export const BlogPostArticle: FC<Props> = memo(
  ({ children, data, SideBarComp }) => {
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

        <LayoutWithSidebar
          sidebar={
            <>
              <div id="blog-share" className="spacer">
                <NadeShareActions
                  url={`/blog/${data.slug}`}
                  title={data.title}
                  image={data.thumbnailUrl}
                  visisble={true}
                />
              </div>

              <div id="blog-sidebar-wrap" className="spacer">
                <SidebarSkyskraperAd />
              </div>

              {!!SideBarComp && (
                <div id="blog-side-comp" className="spacer sticky">
                  <div className="spacer">
                    <SideBarComp />
                  </div>
                </div>
              )}
            </>
          }
        >
          <article id="blog-article">
            <div id="title-image">
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
        </LayoutWithSidebar>

        <style jsx>{`
          #blog-article {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows:
              min-content
              min-content
              min-content
              min-content;
            grid-template-areas:
              "title-img"
              "article";
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          #title-image {
            grid-area: title-img;
            position: relative;
            height: 40vh;
            background: url(${data.imageUrl});
            border-radius: ${Dimensions.BORDER_RADIUS};
            overflow: hidden;
            background-size: cover;
            background-position: center;
          }

          #blog-share {
            height: 40vh;
          }

          #article-title {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.2);
            padding: 30px 30px;
            color: white;
            z-index: 1;
            background: linear-gradient(
              180deg,
              rgba(17, 17, 17, 0) 0%,
              rgba(32, 32, 32, 0.4) 100%
            );
            height: 50%;
            display: flex;
            align-items: flex-end;
          }

          #article-title h1 {
            font-weight: 300;
            font-size: 32px;
          }

          .sticky {
            position: sticky;
            top: calc(
              ${Dimensions.HEADER_HEIGHT}px + ${Dimensions.GUTTER_SIZE * 2.5}px
            );
          }

          .spacer {
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          }

          #article-content {
            grid-area: article;
            background: ${colors.DP01};
            padding: 20px 30px;
            border-radius: 5px;
            max-width: 100%;
          }

          #blog-sidebar-wrap {
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
        `}</style>
      </>
    );
  }
);

import { FC, memo, FunctionComponent } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogPost } from "./BlogPost";
import { Dimensions } from "../constants/Constants";
import { prettyDate } from "../utils/DateUtils";
import { BlogAuthor } from "./BlogAuthor";
import { NadeShareActions } from "../nades/NadeShareActions";
import { SEO } from "../layout/SEO2";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify } from "../utils/Common";
import { PageCentralize } from "../common/PageCentralize";
import { EzoicPlaceholder } from "../common/adunits/EzoicPlaceholder";

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
        <PageCentralize>
          <article id="blog-article">
            <div id="article-title">
              <h1>{data.title}</h1>
            </div>
            <div id="article-image">
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

            <div id="blog-share">
              <NadeShareActions
                url={`/blog/${data.slug}`}
                title={data.title}
                image={data.thumbnailUrl}
                visisble={true}
              />
            </div>

            <aside>
              {!!SideBarComp && (
                <div id="blog-side-comp">
                  <SideBarComp />
                </div>
              )}

              <div id="blog-sidebar-wrap">
                <div className="ph-unit">
                  <EzoicPlaceholder id="171" />
                </div>
              </div>
            </aside>
          </article>
        </PageCentralize>

        <style jsx>{`
          #blog-article {
            display: grid;
            grid-template-columns: 1fr 160px;
            grid-template-rows:
              min-content
              min-content
              min-content
              min-content;
            grid-template-areas:
              "title share"
              "image . "
              "article sidebar"
              "article sidebar";
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            margin-bottom: 100px;
            margin-top: ${Dimensions.GUTTER_SIZE}px;
          }

          aside {
            grid-area: sidebar;
          }

          #blog-side-comp {
          }

          .ph-unit {
            margin-top: ${Dimensions.GUTTER_SIZE}px;
          }

          #article-title {
            width: 100%;
            grid-area: title;
          }

          #article-title h1 {
            font-weight: 300;
            font-size: 32px;
          }

          #article-content {
            grid-area: article;
            background: ${colors.DP01};
            padding: 20px 30px;
            border-radius: 5px;
            max-width: 100%;
          }

          #blog-sidebar-wrap {
            grid-area: ad;
            position: sticky;
            top: calc(
              ${Dimensions.HEADER_HEIGHT}px + ${Dimensions.GUTTER_SIZE * 2}px
            );
          }

          .article-date {
            color: #bbb;
            margin-bottom: 15px;
          }

          #article-image {
            position: relative;
            grid-area: image;
            width: 100%;
            padding-bottom: 56.25%;
            border-radius: 5px;
            overflow: hidden;
            background: url(${data.imageUrl});
            background-size: cover;
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

          @media only screen and (max-width: 850px) {
            #blog-article {
              grid-template-columns: 1fr;
              grid-template-areas:
                "share"
                "title"
                "image"
                "article"
                "article";
            }

            aside {
              display: none;
            }
          }
        `}</style>
      </>
    );
  }
);

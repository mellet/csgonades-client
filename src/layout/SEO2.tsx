import { FC, memo } from "react";
import Head from "next/head";
import { descriptionSimplify } from "../utils/Common";

export type BlogPostSchema = {
  url: string;
  title: string;
  image: { url: string; width: number; height: number };
  datePublished: string;
  description: string;
};

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  thumbnail?: string;
  video?: string;
};

export const SEO: FC<Props> = memo(
  ({ description, title, canonical, thumbnail, video }) => {
    const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;
    const pageDescription = descriptionSimplify(description);

    return (
      <>
        <Head>
          {canonical && (
            <link
              rel="canonical"
              href={`https://www.csgonades.com${canonical}`}
            />
          )}

          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta
            name="keywords"
            content="gaming dust2 train mirage inferno cobblestone overpass cache nades flashbang smoke incendiary molotov grenade csgo cs:go counter-strike global offensive"
          />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:site_name" content="CSGO Nades" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_EN" />

          {canonical && (
            <meta
              property="og:url"
              content={`https://www.csgonades.com${canonical}`}
            />
          )}
          {thumbnail && <meta property="og:image" content={thumbnail} />}
          {video && <meta property="og:video" content={video} />}
        </Head>
      </>
    );
  }
);

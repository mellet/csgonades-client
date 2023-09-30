import { FC, memo } from "react";
import Head from "next/head";
import { descriptionSimplify, useGameString } from "../utils/Common";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  thumbnail?: string;
  video?: string;
};

export const SEO: FC<Props> = memo(
  ({ description, title, canonical, thumbnail, video }) => {
    const pageTitle = title ? `${title} - CS Nades` : `CS Nades`;
    const pageDescription = descriptionSimplify(description);
    const { shortGameString } = useGameString();

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
            content={`${shortGameString} gaming dust2 train mirage inferno cobblestone overpass cache nades flashbang smoke incendiary molotov grenade learn practice improve esport e-sport counter-strike`}
          />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:site_name" content="CS Nades" />
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

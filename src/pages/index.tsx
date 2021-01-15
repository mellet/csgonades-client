import { GetStaticProps, NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { SEO } from "../shared-components/SEO";
import { StatsApi, SiteStats } from "../core/api/StatsApi";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { Navigation } from "../navigation/Navigation";

type Props = {
  stats: SiteStats | null;
};

const Index: NextPage<Props> = ({ stats }) => (
  <>
    <SEO canonical="/" />
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={<FrontPage stats={stats} />}
    />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  let stats: SiteStats | null = null;

  const statsResult = await StatsApi.getStats();

  if (statsResult.isOk()) {
    stats = statsResult.value;
  }

  return {
    props: {
      stats,
    },
    revalidate: 60 * 10,
  };
};

export default Index;

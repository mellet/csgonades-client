import { GetStaticProps, NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { SEO } from "../shared-components/SEO";
import { StatsApi, SiteStats } from "../core/api/StatsApi";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { Navigation } from "../navigation/Navigation";
import { AppConfig } from "../constants/Constants";

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  let stats: SiteStats | null = null;

  const statsResult = await StatsApi.getStats();

  if (statsResult.isOk()) {
    stats = statsResult.value;
  }

  return {
    props: {
      stats,
    },
    revalidate: AppConfig.revalidationTime,
  };
};

export default Index;

import { GetStaticProps, NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { SEO } from "../shared-components/SEO";
import { StatsApi, SiteStats } from "../core/api/StatsApi";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { Navigation } from "../navigation/Navigation";
import { NadeApi } from "../nade/data/NadeApi";
import { NadeLight } from "../nade/models/Nade";
import { Config } from "../constants/Constants";

type Props = {
  stats: SiteStats | null;
  recentNades: NadeLight[];
};

const Index: NextPage<Props> = ({ stats, recentNades }) => (
  <>
    <SEO canonical="/" />
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={<FrontPage stats={stats} recentNades={recentNades} />}
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  let stats: SiteStats | null = null;
  let recentNades: NadeLight[] = [];

  const statsResult = await StatsApi.getStats();
  const recentNadesResult = await NadeApi.getRecent();

  if (statsResult.isOk()) {
    stats = statsResult.value;
  }

  if (recentNadesResult.isOk()) {
    recentNades = recentNadesResult.value;
  }

  return {
    props: {
      stats,
      recentNades,
    },
    revalidate: Config.revalidationTime,
  };
};

export default Index;

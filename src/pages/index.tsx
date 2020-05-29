import { GetStaticProps, NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { SEO } from "../layout/SEO2";
import { StatsApi, SiteStats } from "../api/StatsApi";

type Props = {
  stats: SiteStats | null;
};

const Index: NextPage<Props> = ({ stats }) => (
  <>
    <SEO canonical="/" />
    <FrontPage stats={stats} />
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
    unstable_revalidate: 10,
  };
};

export default Index;

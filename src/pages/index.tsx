import { GetStaticProps, NextPage } from "next";
import React from "react";
import { FrontPage } from "../frontpage/FrontPage";
import { SEO } from "../layout/SEO";
import { StatsApi, SiteStats } from "../api/StatsApi";
import { Layout2 } from "../layout2/Layout2";
import { Header } from "../layout/Header";
import { Navigation } from "../navigation/Navigation";

type Props = {
  stats: SiteStats | null;
};

const Index: NextPage<Props> = ({ stats }) => (
  <>
    <SEO canonical="/" />
    <Layout2
      header={<Header />}
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

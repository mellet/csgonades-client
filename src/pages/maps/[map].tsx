import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { CsMap, getAllCsMaps } from "../../map/models/CsGoMap";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { AppConfig } from "../../constants/Constants";
import { MapMain } from "../../map/containers/MapMain";
import { MapSidebar } from "../../map/containers/MapSidebar";

interface Props {
  mapName: CsMap;
}

const Map: NextPage<Props> = ({ mapName }) => {
  return (
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={<MapMain key={mapName} csMap={mapName} />}
      sidebar={<MapSidebar key={mapName} map={mapName} />}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const maps = getAllCsMaps();

  const paths = maps.map((m) => ({
    params: {
      map: m,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { map: CsMap }> = async ({
  params,
}) => {
  if (!params || !params.map) {
    return { notFound: true };
  }

  const mapName = params.map;

  return {
    props: {
      mapName,
    },
    revalidate: AppConfig.revalidationTime,
  };
};

export default Map;

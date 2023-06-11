import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { CsgoMap, getAllCsGoMaps } from "../../map/models/CsGoMap";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { AppConfig } from "../../constants/Constants";
import { MapMain } from "../../map/containers/MapMain";
import { MapSidebar } from "../../map/containers/MapSidebar";
import { useNadesForMapFromApi } from "../../map/data/useNadesForMap";

interface Props {
  mapName: CsgoMap;
}

const Map: NextPage<Props> = ({ mapName }) => {
  const { nades, isLoading } = useNadesForMapFromApi(mapName);

  return (
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={
        <MapMain
          key={mapName}
          map={mapName}
          allNades={nades}
          isLoading={isLoading}
        />
      }
      sidebar={
        <MapSidebar
          key={mapName}
          map={mapName}
          nades={nades}
          isLoading={isLoading}
        />
      }
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const maps = getAllCsGoMaps();

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

export const getStaticProps: GetStaticProps<Props, { map: CsgoMap }> = async ({
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

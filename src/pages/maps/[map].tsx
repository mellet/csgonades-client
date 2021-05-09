import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { NadeApi } from "../../nade/data/NadeApi";
import { CsgoMap, getAllCsGoMaps } from "../../map/models/CsGoMap";
import { NadeLight } from "../../nade/models/Nade";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { Config } from "../../constants/Constants";
import { MapMain } from "../../map/containers/MapMain";
import { MapSidebar } from "../../map/containers/MapSidebar";

interface Props {
  mapName: CsgoMap;
  initialNades: NadeLight[];
}

const Map: NextPage<Props> = ({ mapName, initialNades }) => {
  if (!initialNades) {
    return null;
  }

  return (
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={<MapMain key={mapName} map={mapName} allNades={initialNades} />}
      sidebar={<MapSidebar map={mapName} nades={initialNades} />}
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
  const mapNadesResult = await NadeApi.getByMap(mapName);

  const nades = mapNadesResult.isOk() ? mapNadesResult.value : [];

  return {
    props: {
      mapName,
      initialNades: nades,
    },
    revalidate: Config.revalidationTime,
  };
};

export default Map;

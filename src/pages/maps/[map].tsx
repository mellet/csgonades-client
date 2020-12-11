import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { NadeApi } from "../../nade-data/NadeApi";
import { CsgoMap, getAllCsGoMaps } from "../../nade-data/Nade/CsGoMap";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { MapMain } from "../../map-main/MapMain";
import { Layout2 } from "../../layout2/Layout2";
import { Navigation } from "../../navigation/Navigation";
import { Header } from "../../layout/Header";
import { MapSidebar } from "../../map-sidebar/MapSidebar";

interface Props {
  map: CsgoMap;
  ssrNades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, ssrNades }) => {
  if (!ssrNades) {
    return null;
  }

  return (
    <Layout2
      header={<Header />}
      nav={<Navigation />}
      main={<MapMain key={map} map={map} allNades={ssrNades} />}
      sidebar={<MapSidebar map={map} nades={ssrNades} />}
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

export const getStaticProps: GetStaticProps<any, { map: CsgoMap }> = async ({
  params,
}) => {
  if (!params) {
    return { notFound: true };
  }

  const mapName = params.map;
  const mapNadesResult = await NadeApi.getByMap(mapName);

  const ssrNades = mapNadesResult.isOk() ? mapNadesResult.value : [];

  return {
    props: {
      map: mapName,
      ssrNades: ssrNades,
    },
    revalidate: 60 * 5,
  };
};

export default Map;

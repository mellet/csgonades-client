import { FC, memo } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { CsgnList } from "../common/list/CsgnList";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { isMobileOnly } from "react-device-detect";
import { NadeItemMobile } from "../common/nadeitem/NadeItemMobile";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { TopContributorList } from "./TopContributor";

type Props = {
  allNades: NadeLight[];
};

export const MapPageNades: FC<Props> = memo(({ allNades }) => {
  const { mapView } = useSetMapView();
  const { colors } = useTheme();
  const nades = useFilterServerSideNades(allNades);

  function renderItem(item: NadeLight) {
    if (isMobileOnly) {
      return <NadeItemMobile nade={item} />;
    } else {
      return <NadeItem nade={item} />;
    }
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  const mapNadesClassName =
    mapView === "overview" ? "mappage-nades hidden" : "mappage-nades";

  return (
    <>
      <div className={mapNadesClassName}>
        <CsgnList<NadeLight>
          data={nades}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          topRightComp={
            <div className="mini-sidebar">
              {allNades && <TopContributorList nades={allNades} />}
            </div>
          }
        />
      </div>
      <style jsx>{`
        .hidden {
          display: none;
        }

        .ph-incontent {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .mini-sidebar {
        }

        #displaying-coords-wrap {
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        #displaying-coords {
          background: ${colors.DP01};
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          background: rgba(13, 97, 128, 0.5);
        }

        span {
          display: inline-block;
          padding: 5px 15px;
          font-size: 12px;
          color: white;
        }

        button {
          display: block;
          background: rgba(173, 0, 0, 0.7);
          color: white;
          outline: none;
          padding: 5px 10px;
          font-size: 12px;
          border: none;
          cursor: pointer;
          margin-left: 5px;
        }
      `}</style>
    </>
  );
});

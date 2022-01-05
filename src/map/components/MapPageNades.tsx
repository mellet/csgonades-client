import { FC, memo } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { useFilterServerSideNades } from "../logic/useFilteredNades";
import { useTheme } from "../../core/settings/SettingsHooks";
import dynamic from "next/dynamic";
import { SortByBar } from "./SuggestedNades/SortByBar";
import useSortedNades from "./SuggestedNades/useSortedNades";
import { useMediaQuery } from "react-responsive";
import { Dimensions, LayoutBreakpoint } from "../../constants/Constants";

const NadeItemMobile = dynamic(() =>
  import(
    /* webpackChunkName: "nadeitemmobile" */ "../../nade/components/NadeItem/NadeItemMobile"
  ).then((mod) => mod.NadeItemMobile)
);

type Props = {
  allNades: NadeLight[];
};

export const MapPageNades: FC<Props> = memo(({ allNades }) => {
  const { colors } = useTheme();
  const nades = useFilterServerSideNades(allNades);
  const sortedNades = useSortedNades(nades);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  function renderItem(item: NadeLight) {
    if (isMobile) {
      return <NadeItemMobile nade={item} />;
    } else {
      return <NadeItem nade={item} />;
    }
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div className="sort-bar">
        <SortByBar />
      </div>
      <div className="mappage-nades">
        {sortedNades && (
          <CsgnList<NadeLight>
            data={sortedNades}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            enableAds={true}
          />
        )}
      </div>
      <style jsx>{`
        .sort-bar {
          margin-bottom: 8px;
        }

        .hidden {
          display: none;
        }

        .ph-incontent {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .mini-sidebar {
          height: 100%;
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

        @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
          .sort-bar {
            padding: 0px ${Dimensions.GUTTER_SIZE}px;
            padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          }
        }
      `}</style>
    </>
  );
});

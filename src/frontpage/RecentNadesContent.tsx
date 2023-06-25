import { FC } from "react";
import { useTheme } from "../core/settings/useTheme";
import { NadeLight } from "../nade/models/NadeLight";
import { CsgnList } from "../shared-components/list/CsgnList";
import { Dimensions } from "../constants/Constants";
import { NadeItem } from "../nade/components/NadeItem/NadeItem";

type Props = {
  recentNades: NadeLight[];
};

export const RecentNadesContent: FC<Props> = ({ recentNades }) => {
  const { colors } = useTheme();

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div className="recent-nades">
        <h3>Recently added nades</h3>
        <CsgnList<NadeLight>
          data={recentNades}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          enableAds={false}
        />
      </div>
      <style jsx>{`
        .recent-nades {
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.TEXT};
        }

        .recent-wrap {
          padding-bottom: 75px;
          color: ${colors.TEXT};
        }

        .recent-nade-wrap {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        .recent {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  );
};

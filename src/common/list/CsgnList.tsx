import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";
import { ListAds } from "./ListAds";
import { isMobile } from "react-device-detect";
import { EzoicPlaceholder } from "../adunits/EzoicPlaceholder";

type Props<T> = {
  data: T[];
  enableAds?: boolean;
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
};

function ListBase<T>(props: Props<T>): JSX.Element {
  const { data, renderItem, keyExtractor } = props;

  return (
    <List
      {...props}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

const List: FC<Props<any>> = memo(
  ({ data, keyExtractor, renderItem, enableAds = false }) => {
    const { colors } = useTheme();
    const numItems = data.length;
    const isEmpty = numItems === 0;

    const enableInListAds = enableAds && isMobile;
    const enableBigAd = enableAds && !isMobile;

    return (
      <>
        {isEmpty && (
          <div className="empty-list">
            No nades here yet, sign in to add some!
          </div>
        )}
        <div className="list">
          {data.map((item, i) => (
            <div
              className="list-item"
              key={keyExtractor(item)}
              style={{ order: i + 1 }}
            >
              {renderItem(item)}
            </div>
          ))}

          {enableBigAd && (
            <div className="ph-1">
              <EzoicPlaceholder id="195" />
            </div>
          )}

          {enableInListAds && <ListAds numNades={numItems} />}
        </div>
        <style jsx>{`
          .empty-list {
            background: ${colors.DP02};
            border-radius: 5px;
            border: 1px solid ${colors.BORDER};
            color: ${colors.TEXT};
            font-size: 18px;
            padding: 30px;
          }

          .list {
            display: grid;
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
          }

          .ph-1 {
            display: flex;
            grid-column: 1 / 4;
            grid-row: 7 / 8;
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          }

          @media only screen and (max-width: 1020px) {
            .ph-1 {
              grid-column: 1 / 3;
            }
          }

          @media only screen and (max-width: 600px) {
            .ph-1 {
              grid-column: 1 / 2;
            }
          }
        `}</style>
      </>
    );
  }
);

export const CsgnList = ListBase;

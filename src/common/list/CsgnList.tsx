import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  topRightComp?: JSX.Element;
  firstAd?: JSX.Element;
  secondAd?: JSX.Element;
};

function ListBase<T>(props: Props<T>) {
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
  ({ data, keyExtractor, renderItem, topRightComp, firstAd, secondAd }) => {
    const { colors } = useTheme();
    const numItems = data.length;
    const isEmpty = numItems === 0;

    const displayFirstAd = numItems >= 15;

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
              style={{ order: i }}
            >
              {renderItem(item)}
            </div>
          ))}
          {!!topRightComp && <div className="contrib">{topRightComp}</div>}

          {!!firstAd && <div className="ph1">{firstAd}</div>}

          {!!secondAd && displayFirstAd && (
            <div className="ph2">{secondAd}</div>
          )}
        </div>
        <style jsx>{`
          .empty-list {
            border: 1px solid ${colors.BORDER};
            padding: 30px;
            font-size: 18px;
            border-radius: 5px;
            background: ${colors.DP02};
            color: ${colors.TEXT};
          }

          .list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          .ph1,
          .ph2,
          .contrib {
            background: ${colors.DP02};
            grid-row: 2 / 3;
            border-radius: 5px;
            overflow: hidden;
          }

          .ph1 {
            grid-column: 1 / 2;
          }

          .contrib {
            grid-column: 2 / 3;
            height: 250px;
          }

          .ph2 {
            grid-column: 3 / 4;
          }

          @media only screen and (max-width: 1020px) {
            .ph1 {
              grid-row: 2/3;
              grid-column: 2/3;
            }

            .contrib {
              grid-row: 2/3;
              grid-column: 1/2;
            }

            .ph2 {
              grid-row: 5/6;
              grid-column: 2/3;
            }
          }

          @media only screen and (max-width: 600px) {
            .contrib {
              grid-row: 1/2;
              grid-column: 1/2;
            }

            .ph1 {
              grid-row: 6/7;
              grid-column: 1/2;
              margin-left: -15px;
              margin-right: -15px;
            }

            .ph2 {
              grid-row: 14/15;
              grid-column: 1/2;
              margin-left: -15px;
              margin-right: -15px;
            }
          }
        `}</style>
      </>
    );
  }
);

export const CsgnList = ListBase;

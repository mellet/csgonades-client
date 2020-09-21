import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";
import { ListAds } from "./ListAds";

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  topRightComp?: JSX.Element;
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
  ({ data, keyExtractor, renderItem, topRightComp }) => {
    const { colors } = useTheme();
    const numItems = data.length;
    const isEmpty = numItems === 0;

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

          <ListAds numNades={numItems} />
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

          .contrib {
            grid-row: 2 / 3;
            grid-column: 2 / 3;
            height: 250px;
            background: ${colors.DP02};
            border-radius: 5px;
            overflow: hidden;
          }

          @media only screen and (max-width: 1020px) {
            .contrib {
              grid-row: 1/2;
              grid-column: 2/3;
            }

            .ph1 {
              grid-row: 5 / 6;
              grid-column: 1 / 2;
            }

            .ph2 {
              grid-row: 5 / 6;
              grid-column: 2/3;
            }

            .ph3 {
              grid-row: 10 / 11;
              grid-column: 1 / 3;
            }
          }

          @media only screen and (max-width: 600px) {
            .contrib {
              grid-row: 1 / 2;
              grid-column: 1 / 2;
            }

            .ph1 {
              grid-row: 6/7;
              grid-column: 1/2;
              margin-left: -15px;
              margin-right: -15px;
            }

            .ph2 {
              grid-row: 12/13;
              grid-column: 1/2;
              margin-left: -15px;
              margin-right: -15px;
            }

            .ph3 {
              grid-row: 20/21;
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

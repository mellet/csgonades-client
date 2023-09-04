import { FC, memo } from "react";
import { useTheme } from "../../core/settings/useTheme";
import { Dimensions } from "../../constants/Constants";
import { ListAds } from "./ListAds";

type Props<T> = {
  data: T[];
  enableAds?: boolean;
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
  emptyMessage?: string;
  isLoading?: boolean;
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
  ({
    data,
    keyExtractor,
    renderItem,
    enableAds = false,
    emptyMessage,
    isLoading,
  }) => {
    const { colors } = useTheme();
    const numItems = data.length;
    const isEmpty = numItems === 0;
    const displayEmptyMessage = isEmpty && !isLoading;

    const enableInListAds = enableAds;

    return (
      <>
        {displayEmptyMessage && (
          <div className="empty-list">
            {emptyMessage
              ? emptyMessage
              : "No nades here yet, sign in to add some!"}
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

          {enableInListAds && <ListAds numNades={numItems} />}
        </div>
        <style jsx>{`
          .empty-list {
            background: ${colors.FAV_YELLOW};
            border-radius: 5px;
            border: 1px solid ${colors.BORDER};
            color: white;
            font-size: 16px;
            font-weight: 400;
            padding: ${Dimensions.GUTTER_SIZE}px;
          }

          .list {
            display: grid;
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
          }
        `}</style>
      </>
    );
  }
);

export const CsgnList = ListBase;

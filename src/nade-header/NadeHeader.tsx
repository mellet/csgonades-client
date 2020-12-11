import { FC, Suspense } from "react";
import { Dimensions } from "../constants/Constants";
import UserNav from "../layout/Navigation/UserNav";
import { Nade } from "../nade-data/Nade/Nade";
import { NadeTitle } from "./NadeTitle";
import { generateNadeItemTitle } from "../utils/Common";

const isServer = typeof window === "undefined";

type Props = {
  nade: Nade;
};

export const NadeHeader: FC<Props> = ({ nade }) => {
  const [layoutTitle, subTitle] = generateNadeItemTitle(
    nade.title,
    nade.startPosition,
    nade.endPosition,
    nade.type,
    nade.oneWay,
    nade.map
  );

  return (
    <>
      <div id="nade-header">
        <div id="nade-title">
          <NadeTitle
            title={layoutTitle}
            subTitle={subTitle}
            nadeId={nade.id}
            map={nade.map}
          />
        </div>

        {!isServer && (
          <Suspense fallback={<div />}>
            <UserNav />
          </Suspense>
        )}
      </div>
      <style jsx>{`
        #nade-header {
          display: flex;
          align-items: center;
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        #nade-title {
          flex: 1;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};

import { FC, Suspense } from "react";
import { Dimensions } from "../../../constants/Constants";
import UserNav from "../../../layout/defaultheader/components/UserNav";
import { Nade } from "../../models/Nade";
import { NadeTitleBar } from "./NadeTitleBar";

const isServer = typeof window === "undefined";

type Props = {
  nade: Nade;
};

export const NadeHeader: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="nade-header">
        <div id="nade-title">
          <NadeTitleBar nade={nade} />
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

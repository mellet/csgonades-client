import { FC, memo } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { NadeLight } from "../models/Nade/Nade";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { FrontPageRecentPosts } from "./FrontPageRecentPosts";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { PropellerAd } from "./PropellerAd";

type Props = {
  recentNades: NadeLight[];
};

export const FrontPage: FC<Props> = memo(({ recentNades }) => {
  return (
    <>
      <FrontPageJumbo />

      <PageCentralize>
        <div className="recent-wrap">
          <FrontPageRecentPosts />
          <aside className="front-page-sidebar">
            <FrontpageActions />
            <EzoicPlaceHolder id={163} />
            <PropellerAd />
          </aside>
        </div>

        <div className="recent-nade-wrap">
          <RecentNades recentNades={recentNades} />
        </div>
      </PageCentralize>

      <div className="bottom-placeholder">
        <EzoicPlaceHolder id={110} />
      </div>

      <style jsx>{`
        .recent-wrap {
          margin-top: 75px;
          margin-bottom: 75px;
          display: flex;
        }

        .front-page-sidebar {
          margin-left: 50px;
          width: 350px;
        }

        .recent-nade-wrap {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        .bottom-placeholder {
          margin-bottom: 100px;
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .recent {
          display: flex;
          flex-direction: row;
          margin-top: 100px;
          margin-bottom: 100px;
        }

        @media only screen and (max-width: 1000px) {
          .recent-wrap {
            flex-direction: column;
          }

          .front-page-sidebar {
            margin-left: 0;
            width: 100%;
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .recent {
            flex-direction: column;
          }

          .recent-nade-wrap {
            margin-left: -10px;
            margin-right: -10px;
          }
        }
      `}</style>
    </>
  );
});

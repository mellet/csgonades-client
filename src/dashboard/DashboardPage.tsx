import { FC } from "react";
import { DBNadeList } from "./DBNadeList";
import { useIsSignedIn } from "../store/AuthStore/AuthHooks";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SEO } from "../layout/SEO";

export const DashboardPage: FC = () => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <SEO canonical="/dashboard" title="Dashboard" />
      <div id="dashboard-page-wrap">
        <div id="message">
          There is currently and issue updating the view count for nades.
          I&apos;m investigating the issue. I have hidden the view count in the
          list items for now. You can still see it here, or on the nade page
          under the video.
        </div>
        <div id="dashboard-page">
          <h1 id="title">DASHBOARD</h1>
          <div id="nade-list">
            <h2>Your nades</h2>
            <DBNadeList />
          </div>
        </div>
      </div>
      <style jsx>{`
        #dashboard-page-wrap {
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        #message {
          display: none;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.WARNING};
          color: white;
          border-radius: 5px;
          padding: 10px;
          text-align: center;
        }

        #dashboard-page {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP02};
          border-radius: 5px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: min-content min-content;
          grid-template-areas:
            "dbtitle dbtitle dbtitle"
            "dbnades dbnades dbnades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
        }

        #title {
          grid-area: dbtitle;
          margin: 0;
          padding: 0;
          font-size: 20px;
          padding: 20px 30px;
          background: ${colors.PRIMARY};
          color: white;
        }

        h2 {
          font-size: 20px;
          margin: 0;
          padding: 0;
          margin-bottom: 20px;
        }

        #nade-list {
          grid-area: dbnades;
          padding: 0px 30px 20px 30px;
        }
      `}</style>
    </>
  );
};

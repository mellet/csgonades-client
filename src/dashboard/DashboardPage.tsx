import { FC, useState } from "react";
import { DashboardNades } from "./DBNadeList";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../core/settings/useTheme";
import { SEO } from "../shared-components/SEO";
import { MapNadeSelector } from "../shared-components/map-nade-selector/MapNadeSelector";
import { CsgoMap } from "../map/models/CsGoMap";
import { useSignedInUser } from "../core/authentication/useSignedInUser";

export const DashboardPage: FC = () => {
  const { colors } = useTheme();
  const { signedInUser } = useSignedInUser();
  const [csgoMap, setCsGoMap] = useState<CsgoMap>("mirage");

  if (!signedInUser) {
    return null;
  }

  return (
    <>
      <SEO canonical="/dashboard" title="Dashboard" />
      <div id="dashboard-page">
        <h1 id="title">DASHBOARD</h1>
        <div id="nade-list">
          <MapNadeSelector selectedMap={csgoMap} onMapSelect={setCsGoMap} />
          <DashboardNades csgoMap={csgoMap} user={signedInUser} />
        </div>
      </div>
      <style jsx>{`
        #dashboard-page {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: min-content min-content;
          grid-template-areas:
            "dbtitle dbtitle dbtitle"
            "dbnades dbnades dbnades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        #title {
          grid-area: dbtitle;
          margin: 0;
          padding: 0;
          font-size: 24px;
          color: ${colors.TEXT};
        }

        h2 {
          font-size: 20px;
          margin: 0;
          padding: 0;
          margin-bottom: 20px;
        }

        #nade-list {
          grid-area: dbnades;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};

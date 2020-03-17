import { FC } from "react";
import { AnimationTimings, Dimensions } from "../../constants/Constants";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { PageLink } from "../../common/PageLink";

type Props = {
  mapName: CsgoMap;
  currentMapPath?: string | string[];
};

export const MobileMapLink: FC<Props> = ({ mapName, currentMapPath }) => {
  const { colors } = useTheme();

  const selected = currentMapPath ? currentMapPath.includes(mapName) : false;
  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        <PageLink href={`/maps/[map]`} as={`/maps/${mapName}`}>
          <span className="nav-text">{capitalize(mapName)}</span>
        </PageLink>
      </li>
      <style jsx>{`
        li a {
          text-decoration: none;
          display: inline-flex;
          align-content: center;
          color: ${colors.TEXT};
          width: 100%;
          transition: background ${AnimationTimings.fast}s;
          padding: 15px 50px 15px 10px;
          border-top: 1px solid ${colors.BORDER};
        }

        li a:hover {
          background: ${colors.NAV_HOVER};
        }

        li a .nav-text {
          align-self: center;
          margin-left: ${Dimensions.PADDING_MEDIUM};
        }

        .nav-selected {
          background: ${colors.PRIMARY_10};
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

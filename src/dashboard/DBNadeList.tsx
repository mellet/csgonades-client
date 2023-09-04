import { FC, useMemo } from "react";
import { NadeLight } from "../nade/models/NadeLight";
import { NadeStatus } from "../nade/models/Status";
import { generateTitle, kFormatter } from "../utils/Common";
import { PageLink } from "../shared-components/PageLink";
import { prettyDate } from "../utils/DateUtils";
import { useTheme } from "../core/settings/useTheme";
import Link from "next/link";
import {
  FaCheck,
  FaQuestion,
  FaExclamationTriangle,
  FaEdit,
  FaClock,
  FaStar,
  FaComment,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useUserNadesByMap } from "../users/data/useUserNadesByMap";
import { CsMap, mapString } from "../map/models/CsGoMap";
import { LoadingSpinner } from "../users/views/LoadingSpinner";
import { User } from "../users/models/User";
import { NadeIcon } from "../shared-components/nade-icons";
import Image from "next/image";
import { Dimensions } from "../constants/Constants";
import { useGameMode } from "../core/useGameMode";
import { ScoreIndicator } from "./ScoreIndicator";
import { DashboardVideoLink } from "./VideoLink";

type Props = {
  csgoMap: CsMap;
  user: User;
};

export const DashboardNades: FC<Props> = ({ csgoMap, user }) => {
  const { colors } = useTheme();
  const { gameMode } = useGameMode();

  const { nades, isLoading } = useUserNadesByMap(
    user.steamId,
    csgoMap,
    gameMode
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!nades) {
    return null;
  }

  if (nades?.length === 0 && !isLoading) {
    return <div>You don&apos;t have any nades on {mapString(csgoMap)}.</div>;
  }

  return (
    <>
      <div id="nade-list">
        <table>
          <thead>
            <tr>
              <td>Status</td>
              <td>Type</td>
              <td>Video</td>
              <td></td>
              <td>Title</td>
              <td>
                <FaEye />
              </td>
              <td>
                <FaStar />
              </td>
              <td>
                <FaComment />
              </td>
              <td>Score</td>
              <td>Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {nades.map((n) => (
              <DasboardNadeItem key={n.id} nade={n} />
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        #nade-list {
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          table-layout: auto;
          color: ${colors.TEXT};
        }

        table thead td {
          font-weight: 400;
          padding: 10px 20px;
          border-right: 1px solid ${colors.BORDER};
          border-bottom: 1px solid ${colors.DARK_BORDER};
        }

        table thead td:last-child {
          border-right: none;
        }
      `}</style>
    </>
  );
};

type NadeItemProps = {
  nade: NadeLight;
};

const DasboardNadeItem: FC<NadeItemProps> = ({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <tr className="nade-item">
        <td align="center">
          <StatusText status={nade.status} />
        </td>
        <td className="nade-type" align="center">
          <NadeIcon nadeType={nade.type} size={30} />
        </td>
        <td align="center">
          <DashboardVideoLink
            gfycat={nade.gfycat}
            youTubeUrl={nade.youTubeId}
          />
        </td>
        <td className="nade-thumb">
          <PageLink href={`/nades/${nade.slug || nade.id}`}>
            <div className="nade-thumb-image">
              <Image
                fill
                alt="Nade image"
                src={nade.images.result.small}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </PageLink>
        </td>
        <td id="nade-title">
          <PageLink href={`/nades/${nade.slug || nade.id}`}>
            <span>
              {generateTitle(
                nade.startPosition,
                nade.endPosition,
                nade.type,
                nade.oneWay
              )}
            </span>
          </PageLink>
        </td>
        <td className="nade-comments">{kFormatter(nade.viewCount)}</td>
        <td className="nade-fav">{kFormatter(nade.favoriteCount)}</td>
        <td className="nade-comments">{kFormatter(nade.commentCount)}</td>
        <td align="center">
          <ScoreIndicator
            createdAt={nade.createdAt}
            favoriteCount={nade.favoriteCount}
            viewCount={nade.viewCount}
            score={nade.score}
          />
        </td>
        <td>{prettyDate(nade.createdAt)}</td>
        <td>
          <Link
            href={`/nades/${nade.slug || nade.id}/edit`}
            passHref
            legacyBehavior
          >
            <button className="edit-btn">
              <FaEdit /> Edit
            </button>
          </Link>
        </td>
      </tr>
      <style jsx>{`
        td {
          border-right: 1px solid ${colors.BORDER};
          border-bottom: 1px solid ${colors.BORDER};
          padding: 8px 16px;
        }

        td:last-child {
          border-right: none;
        }

        .edit-btn {
          background: ${colors.filterBg};
          padding: 5px 10px;
          border: none;
          outline: none;
          white-space: nowrap;
          border-radius: 5px;
          color: white;
          cursor: pointer;
        }

        .edit-btn:hover {
          background: ${colors.filterBgHover};
        }

        .nade-thumb-image {
          position: relative;
          height: 42px;
          width: 75px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .nade-item {
          border-collapse: collapse;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .nade-title {
          width: 100%;
        }
      `}</style>
    </>
  );
};

const StatusText: FC<{ status: NadeStatus }> = ({ status }) => {
  const statusIcon = useMemo(() => {
    if (status === "accepted") {
      return (
        <Popup
          position="top center"
          content="Accepted"
          inverted
          size="tiny"
          trigger={<FaCheck />}
        />
      );
    }
    if (status === "pending") {
      return (
        <Popup
          position="top center"
          content="Waiting for approval"
          inverted
          size="tiny"
          trigger={<FaClock />}
        />
      );
    }
    if (status === "declined") {
      return (
        <Popup
          position="top center"
          content="Declined, see nade comment"
          inverted
          size="tiny"
          trigger={<FaExclamationTriangle />}
        />
      );
    }

    if (status === "deleted") {
      return (
        <Popup
          position="top center"
          content="Deleted, will be removed later"
          inverted
          size="tiny"
          trigger={<FaTrash />}
        />
      );
    }

    return <FaQuestion />;
  }, [status]);

  const statusColor = useMemo(() => {
    if (status === "accepted") {
      return "#96bd15";
    } else if (status === "pending") {
      return "#fc9003";
    } else {
      return "red";
    }
  }, [status]);

  return (
    <>
      <span>{statusIcon}</span>
      <style jsx>{`
        span {
          color: ${statusColor};
        }
      `}</style>
    </>
  );
};

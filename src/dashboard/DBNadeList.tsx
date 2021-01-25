import { FC, useState, useEffect, useMemo } from "react";
import { NadeLight } from "../nade/models/Nade";
import { Status } from "../nade/models/Status";
import { NadeApi } from "../nade/data/NadeApi";
import { useSignedInUser } from "../core/authentication/useSignedInUser";
import { sortByDate, generateTitle, kFormatter } from "../utils/Common";
import { PageLink } from "../shared-components/PageLink";
import { prettyDate } from "../utils/DateUtils";
import { useTheme } from "../core/settings/SettingsHooks";
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

export const DBNadeList: FC = () => {
  const { colors } = useTheme();
  const user = useSignedInUser();
  const [userNades, setUserNades] = useState<NadeLight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      NadeApi.byUser(user.steamId)
        .then((res) => {
          if (res.isOk()) {
            const nades = res.value;
            nades.sort((a, b) => sortByDate(a.createdAt, b.createdAt));
            setUserNades(nades);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userNades.length === 0 && !loading) {
    return (
      <div>
        You don&apos;t have any nades. If you know any good ones, add one.
      </div>
    );
  }

  return (
    <>
      <div id="nade-list">
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Type</td>
              <td>Title</td>
              <td>
                <FaStar />
              </td>
              <td>
                <FaComment />
              </td>
              <td>
                <FaEye />
              </td>
              <td>Created</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {userNades.map((n) => (
              <NadeItem key={n.id} nade={n} />
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        table {
          border-collapse: collapse;
          width: 100%;
          table-layout: auto;
          color: ${colors.TEXT};
        }

        table thead td {
          font-weight: 400;
          padding: 10px 20px;
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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

export const NadeItem: FC<NadeItemProps> = ({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <tr className="nade-item">
        <td>
          <StatusText status={nade.status} />
        </td>
        <td className="nade-type">
          {<img src={`/icons/grenades/${nade.type}.png`} />}
        </td>
        <td id="nade-title">
          <PageLink href="/nades/[nade]" as={`/nades/${nade.slug || nade.id}`}>
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
        <td className="nade-fav">{kFormatter(nade.favoriteCount)}</td>
        <td className="nade-comments">{kFormatter(nade.commentCount)}</td>
        <td className="nade-comments">{kFormatter(nade.viewCount)}</td>
        <td>{prettyDate(nade.createdAt)}</td>
        <td className="nade-thumb">
          <PageLink href="/nades/[nade]" as={`/nades/${nade.slug || nade.id}`}>
            <img src={nade.images.thumbnailUrl} />
          </PageLink>
        </td>
        <td>
          <Link href={`/nades/${nade.slug || nade.id}/edit`}>
            <button className="edit-btn">
              <FaEdit /> Edit
            </button>
          </Link>
        </td>
      </tr>
      <style jsx>{`
        td {
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 10px 20px;
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

        .nade-thumb img {
          width: 75px;
          border-radius: 5px;
        }

        .nade-item {
          border-collapse: collapse;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .nade-title {
          width: 100%;
        }

        .nade-views,
        .nade-fav,
        .nade-type {
        }

        .nade-type img {
          width: 25px;
          height: 25px;
          display: block;
        }
      `}</style>
    </>
  );
};

const StatusText: FC<{ status: Status }> = ({ status }) => {
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

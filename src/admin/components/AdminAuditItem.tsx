import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { prettyDateTime } from "../../utils/DateUtils";
import { AuditDto } from "../models/AuditEvent";

type Props = {
  auditLogEvent: AuditDto;
};

export const AdminAuditItem: FC<Props> = ({ auditLogEvent }) => {
  const { colors } = useTheme();

  const { byUser, createdAt, description, onNadeId } = auditLogEvent;
  return (
    <>
      <div className="admin-audit">
        <div className="avatar">
          <img className="user-avatar" src={byUser.avatar} />
        </div>
        <div className="body">
          <div className="body-header">
            <div className="body-title">
              <Link href={`/nades/${onNadeId}`}>
                <a>
                  <span className="nickname">
                    {byUser.nickname} updated a nade
                  </span>
                </a>
              </Link>
            </div>
            <span className="date">{prettyDateTime(createdAt)}</span>
            {byUser.role !== "user" && (
              <span className="user-role-badge">{capitalize(byUser.role)}</span>
            )}
          </div>
          <div className="audit-content">
            <div className="body">{description}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .admin-audit {
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
          color: ${colors.TEXT};
          display: flex;
          align-items: center;
          padding: 6px;
        }

        .avatar img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .body {
          flex: 1;
        }

        .body-header {
          display: flex;
        }

        .body-title {
          flex: 1;
        }

        .user-role-badge {
          margin-left: 6px;
          background: ${colors.PRIMARY};
          color: white;
          font-size: 0.7em;
          padding: 1px 6px;
          align-self: center;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};

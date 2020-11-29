import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { prettyDateTime } from "../../utils/DateUtils";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { useAdminAudits } from "../data/hooks";

export const AdminAudit: FC = () => {
  const { colors } = useTheme();
  const { auditEvents } = useAdminAudits();

  return (
    <>
      <div className="audits">
        <AdminPageTitle title="Audits" description="Shows who changed what." />

        {auditEvents.map((audit) => (
          <div key={audit.id} className="admin-audit">
            <div className="audit-header">
              <Link href={`/nades/[nade]`} as={`/nades/${audit.onNadeId}`}>
                Nade Changed
              </Link>

              <span className="date">{prettyDateTime(audit.createdAt)}</span>
            </div>
            <div className="body">{audit.description}</div>
            <div className="user">
              <img className="user-avatar" src={audit.byUser.avatar} />
              <span>{audit.byUser.nickname}</span>
              {audit.byUser.role !== "user" && (
                <span className="user-role-badge">
                  {capitalize(audit.byUser.role)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .admin-audit {
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: 30px;
          overflow: hidden;
          color: ${colors.TEXT};
        }

        .audit-header {
          background: ${colors.DP02};
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .body {
          padding: 20px 16px;
        }

        .user {
          padding: 10px 16px;
          display: flex;
          background: ${colors.DP02};
          border-top: 1px solid ${colors.BORDER};
        }

        .user img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 4px;
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

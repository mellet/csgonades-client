import { FC, useMemo } from "react";
import { FaCrown, FaShieldAlt } from "react-icons/fa";
import { useTheme } from "styled-components";
import { Dimensions } from "../../constants/Constants";
import { Role } from "../models/User";

type Props = {
  role: Role;
};

export const RoleLabel: FC<Props> = ({ role }) => {
  const { colors } = useTheme();

  const roleString = useMemo(() => {
    if (role === "administrator") {
      return "Admin";
    } else if (role === "moderator") {
      return "Moderator";
    } else {
      return "";
    }
  }, [role]);

  return (
    <>
      <span className="role-label">
        <span className="icon">
          {role === "administrator" && <FaCrown />}
          {role === "moderator" && <FaShieldAlt />}
        </span>
        {roleString}
      </span>
      <style jsx>{`
        .role-label {
          font-size: 10px;
          line-height: 10px;
          margin-left: 8px;
          padding: 4px 4px;
          background: ${colors.WARNING};
          display: flex;
          align-items: center;
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: white;
          font-weight: 500;
        }

        .icon {
          margin-right: 2px;
          position: relative;
        }
      `}</style>
    </>
  );
};

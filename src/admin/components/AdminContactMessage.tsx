import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/useTheme";
import { prettyDateTime } from "../../utils/DateUtils";
import { ContactDTO } from "../../contact/models/ContactDTOs";
import { RenderMarkdown } from "../../nade/components/RenderMarkdown";

type Props = {
  contactMessage: ContactDTO;
};

export const AdminContactMessage: FC<Props> = ({ contactMessage }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="contact-message">
        <div className="contact-header">
          <span className="name-email">
            {contactMessage.name} ({contactMessage.email})
          </span>
          <span className="date">
            {prettyDateTime(contactMessage.createdAt)}
          </span>
        </div>
        <div className="contact-body">
          <RenderMarkdown value={contactMessage.message} />
        </div>
      </div>
      <style jsx>{`
        .contact-message {
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: 30px;
          overflow: hidden;
        }

        .contact-header {
          background: ${colors.DP02};
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
        }

        .name-email {
          font-weight: 400;
        }

        .contact-body {
          padding: 10px 20px;
        }
      `}</style>
    </>
  );
};

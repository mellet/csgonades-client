import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { prettyDateTime } from "../../utils/DateUtils";
import { ContactDTO } from "../../contact/models/ContactDTOs";
import ReactMarkdown from "react-markdown";

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
          <ReactMarkdown>{contactMessage.message}</ReactMarkdown>
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

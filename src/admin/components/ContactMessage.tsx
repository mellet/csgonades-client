import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { prettyDateTime } from "../../utils/DateUtils";
import { ContactDTO } from "../data/ContactDTOs";
import ReactMarkdown from "react-markdown";

type Props = {
  contactMessage: ContactDTO;
};

export const ContactMessage: FC<Props> = ({ contactMessage }) => {
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
          margin-bottom: 30px;
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .contact-header {
          background: ${colors.DP02};
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
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

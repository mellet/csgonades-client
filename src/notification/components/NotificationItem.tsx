import Image from "next/image";
import { FC, memo } from "react";
import { FaBell } from "react-icons/fa";
import { Notification } from "../models/Notification";
import { useTheme } from "../../core/settings/SettingsHooks";
import { pluralize } from "../../utils/Common";
import { prettyDateTime } from "../../utils/DateUtils";
import { PageLink } from "../../shared-components/PageLink";

type Props = {
  notification: Notification;
};

export const NotificationItem: FC<Props> = memo(({ notification }) => {
  const { colors } = useTheme();

  if (notification.type === "contact-msg" || notification.type === "report") {
    return (
      <>
        <div className={"notification"}>
          <div className="noti-msg">
            <FaBell /> {notificationMessage(notification)}
          </div>
          <div className="noti-date">
            {prettyDateTime(notification.createdAt)}
          </div>
        </div>
        <style jsx>{`
          .notification {
            border-radius: 4px;
            color: black;
            margin-bottom: 6px;
            padding: 10px 15px;
            white-space: nowrap;
          }

          .noti-date {
            font-size: 0.8em;
            margin-top: 4px;
            text-align: right;
          }

          .new {
            animation-duration: 4s;
            animation-name: indicateUnread;
          }

          @keyframes indicateUnread {
            0% {
              background-color: white;
            }
            10% {
              background-color: ${colors.HIGHLIGHT_BG};
            }
            90% {
              background-color: ${colors.HIGHLIGHT_BG};
            }
            100% {
              background-color: white;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <PageLink
        href={`/nades/[nade]`}
        as={`/nades/${notification.nadeSlug || notification.nadeId}`}
      >
        <div className={"notification"}>
          <div className="noti-img">{notificationImage(notification)}</div>
          <div className="noti-msg">{notificationMessage(notification)}</div>
          <div className="noti-date">
            {prettyDateTime(notification.createdAt)}
          </div>
        </div>
      </PageLink>
      <style jsx>{`
        .notification {
          border-top: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          display: block;
          display: grid;
          grid-template-areas:
            "msg msg img"
            "date . img";
          grid-template-columns: 1fr 1fr minmax(40px, 35%);
          grid-template-rows: auto auto;
          grid-column-gap: 8px;
          grid-row-gap: 8px;
          padding: 10px;
          white-space: nowrap;
          width: 100%;
          font-size: 16px;
        }

        .noti-img {
          grid-area: img;
        }

        .noti-msg {
          grid-area: msg;
          white-space: normal;
        }

        .noti-date {
          grid-area: date;
          text-align: left;
        }

        .noti-msg {
          color: ${colors.TEXT};
        }

        .noti-date {
          color: ${colors.TEXT};
          font-size: 0.8em;
        }
      `}</style>
    </>
  );
});

function notificationImage(
  notification: Notification
): JSX.Element | undefined {
  let url: string | undefined = undefined;

  if (
    notification.type === "favorite-agregate" ||
    notification.type === "accepted-nade" ||
    notification.type === "declined-nade" ||
    notification.type === "favorite" ||
    notification.type === "new-comment"
  ) {
    url = notification.thumnailUrl;
  }

  if (!url) {
    return undefined;
  }

  return (
    <>
      <div className="img-wrap">
        <Image src={url} layout="fill" objectFit="cover" quality={100} />
      </div>

      <style jsx>{`
        .img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

function notificationMessage(notification: Notification): JSX.Element {
  switch (notification.type) {
    case "accepted-nade":
      return <span>Your nade was accepted!</span>;
    case "contact-msg":
      return <span>New contact message.</span>;
    case "report":
      return <span>Nade reported</span>;
    case "declined-nade":
      return <span>Your nade was declined.</span>;
    case "favorite-agregate":
      const favCount = notification.count;
      if (favCount === 1) {
        return (
          <span>
            Your nade was favorited by <b>{notification.byNickname}</b>.
          </span>
        );
      } else {
        return (
          <span>
            Your nade was favorited by <b>{notification.byNickname}</b> and $
            {pluralize(favCount - 1, "other")}.
          </span>
        );
      }
    case "new-nade":
      return <span>New nade!</span>;
    case "new-comment":
      return (
        <span>
          <b>{notification.byNickname}</b> commented on your nade.
        </span>
      );

    default:
      return <></>;
  }
}

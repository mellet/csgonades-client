import { FC } from "react";
import { Dimensions, LayoutBreakpoint } from "../constants/Constants";
import { AdUnit } from "../shared-components/adunits/AdUnit";

type Props = {
  mobileTitle: JSX.Element;
  video: JSX.Element;
  description: JSX.Element;
  actions: JSX.Element;
  comments: JSX.Element;
  status: JSX.Element;
};

export const NadeMainLayout: FC<Props> = ({
  actions,
  comments,
  description,
  video,
  mobileTitle,
  status,
}) => {
  return (
    <>
      <div className="nade-main-layout">
        <div className="status">{status}</div>
        <div className="mobile-title">{mobileTitle}</div>
        <div className="advert">
          <div className="sticky">
            <AdUnit name="nadePageSkyscraper" />
          </div>
        </div>
        <div className="video">{video}</div>
        <div className="actions">{actions}</div>
        <div className="description">{description}</div>
        <div className="comments">{comments}</div>
      </div>
      <style jsx>{`
        .nade-main-layout {
          display: grid;
          grid-template-columns: 160px 1fr 160px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-areas:
            "ad status actions"
            "ad video actions"
            "ad video actions"
            "ad video actions"
            "ad desc actions "
            "ad comments actions"
            "ad title title";
          max-width: ${Dimensions.PAGE_WIDTH}px;
          margin: 0 auto;
        }

        .advert {
          grid-area: ad;
        }

        .sticky {
          width: 160px;
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
        }

        .video {
          grid-area: video;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .actions {
          grid-area: actions;
        }

        .status {
          grid-area: status;
        }

        .description {
          grid-area: desc;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .comments {
          grid-area: comments;
          margin-bottom: 100px;
        }

        .mobile-title {
          display: none;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        @media only screen and (max-width: ${LayoutBreakpoint.TABLET}px) {
          .nade-main-layout {
            width: 100%;
            grid-template-columns: 1fr;
            grid-column-gap: 0;
            grid-template-areas:
              "status"
              "video"
              "actions"
              "title"
              "desc"
              "comments"
              "ad";
          }

          .advert {
            display: none;
          }

          .actions {
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .actions > * {
            margin-bottom: 0;
          }
        }

        @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
          .mobile-title {
            display: block;
            grid-area: title;
            padding: 0px ${Dimensions.GUTTER_SIZE}px;
          }

          .actions {
            padding: 0px ${Dimensions.GUTTER_SIZE}px;
            justify-content: center;
          }

          .video {
            margin-left: -${Dimensions.GUTTER_SIZE}px;
            margin-right: -${Dimensions.GUTTER_SIZE}px;
          }
        }
      `}</style>
    </>
  );
};

import { FC } from "react";
import { BlogPost } from "../models/BlogPost";
import { Dimensions } from "../../constants/Constants";
import { AdUnit } from "../../shared-components/adunits/AdUnit";
import { useIsDeviceSize } from "../../core/layout/useDeviceSize";

type Props = {
  data: BlogPost;
};

export const BlogDefaultSidebar: FC<Props> = () => {
  const { isMobile } = useIsDeviceSize();

  return (
    <>
      {!isMobile && (
        <div id="blog-sidebar-wrap">
          <AdUnit name="blogSidebar" />
        </div>
      )}

      <style jsx>{`
        #blog-share {
          border-radius: 8px;
          overflow: hidden;
        }

        #blog-sidebar-wrap {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};

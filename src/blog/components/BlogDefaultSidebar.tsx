import { FC } from "react";
import { NadeShareActions } from "../../nade/components/NadeShareActions";
import { BlogPost } from "../models/BlogPost";
import { Dimensions } from "../../constants/Constants";
import { useMediaQuery } from "react-responsive";
import { AdUnit } from "../../shared-components/adunits/AdUnit";

type Props = {
  data: BlogPost;
};

export const BlogDefaultSidebar: FC<Props> = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <>
      <div id="blog-share">
        <NadeShareActions
          url={`/blog/${data.slug}`}
          title={data.title}
          image={data.thumbnailUrl}
          visisble={true}
        />
      </div>

      {!isMobile && (
        <div id="blog-sidebar-wrap">
          <AdUnit name="blogSidebar" applyMaxWidth={false} />
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

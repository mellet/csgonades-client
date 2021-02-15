import { FC } from "react";
import { SidebarSkyskraperAd } from "../../shared-components/adunits/SidebarSkyskraper";
import { NadeShareActions } from "../../nade/components/NadeShareActions";
import { BlogPost } from "../models/BlogPost";
import { Dimensions } from "../../constants/Constants";

type Props = {
  data: BlogPost;
};

export const BlogDefaultSidebar: FC<Props> = ({ data }) => {
  return (
    <>
      <div id="blog-share" className="spacer">
        <NadeShareActions
          url={`/blog/${data.slug}`}
          title={data.title}
          image={data.thumbnailUrl}
          visisble={true}
        />
      </div>

      <div id="blog-sidebar-wrap" className="spacer">
        <SidebarSkyskraperAd />
      </div>
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

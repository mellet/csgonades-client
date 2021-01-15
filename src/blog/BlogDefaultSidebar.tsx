import { FC } from "react";
import { SidebarSkyskraperAd } from "../shared-components/adunits/SidebarSkyskraper";
import { NadeShareActions } from "../nade/components/NadeShareActions";
import { BlogPost } from "./BlogPost";

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
    </>
  );
};

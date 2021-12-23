import { FC } from "react";
import { Dimensions } from "../../constants/Constants";

export const NadeBlogList: FC = ({ children }) => {
  return (
    <>
      <div className="nade-blog-list-wrap">{children}</div>
      <style jsx>{`
        .nade-blog-list-wrap {
          display: grid;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};

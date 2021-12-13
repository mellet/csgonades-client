import { FC, memo } from "react";
import { useNewPageView } from "../utils/Analytics";

export const PageViewTracker: FC = memo(({}) => {
  useNewPageView();

  return null;
});

import { FC } from "react";
import { useAdminPendingNades } from "../admin/data/hooks/useAdminPendingNades";
import { NadeReviewEmpty } from "./NadeReviewEmpty";
import { NadeReviewWidget } from "./NadeReviewWidget";

export const NadeReview: FC = ({}) => {
  const { pendingNades } = useAdminPendingNades();

  if (!pendingNades.length) {
    return <NadeReviewEmpty />;
  }

  return <NadeReviewWidget pendingNades={pendingNades} />;
};

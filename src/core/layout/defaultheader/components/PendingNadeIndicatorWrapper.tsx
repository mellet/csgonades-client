import { FC } from "react";
import { useIsAdminOrModerator } from "../../../authentication/useIsAdminOrModerator";
import { PendingNadeIndicator } from "./PendingNadeIndicator";

export const PendingNadeIndicatorWrapper: FC = () => {
  const isAdmingOrMod = useIsAdminOrModerator();

  if (!isAdmingOrMod) {
    return null;
  }

  return <PendingNadeIndicator />;
};

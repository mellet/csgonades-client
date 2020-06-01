import { FC, memo } from "react";

type Props = {
  id: string;
};

export const EzoicPlaceholder: FC<Props> = memo(({ id }) => {
  const ezoicId = `ezoic-pub-ad-placeholder-${id}`;
  return <div id={ezoicId} />;
});

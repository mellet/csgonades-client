import { FC, memo } from "react";

type Props = {
  id: string;
};

export const EzoicPlainPlaceholder: FC<Props> = memo(({ id }) => {
  const ezoicId = `ezoic-pub-ad-placeholder-${id}`;
  return (
    <>
      <div className="ez" id={ezoicId} />
    </>
  );
});

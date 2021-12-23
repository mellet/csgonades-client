import { FC } from "react";

type Props = {
  src: string;
};

export const NadeCommentAvatar: FC<Props> = ({ src }) => {
  return (
    <>
      <img src={src} />
      <style jsx>{`
        div {
          grid-area: avatar;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 12px;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
};

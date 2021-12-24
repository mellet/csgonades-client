import { FC } from "react";

type Props = {
  src: string;
};

export const NadeCommentAvatar: FC<Props> = ({ src }) => {
  return (
    <>
      <img src={src} />
      <style jsx>{`
        img {
          grid-area: avatar;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 12px;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
};

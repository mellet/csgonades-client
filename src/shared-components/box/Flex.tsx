import { FC } from "react";

type Props = {
  justify?: "center" | "space-around" | "space-between";
};

export const Flex: FC<Props> = ({ justify, children }) => {
  return (
    <>
      <div className="flex">{children}</div>
      <style jsx>{`
        .flex {
          display: flex;
          justify-content: ${justify};
        }
      `}</style>
    </>
  );
};

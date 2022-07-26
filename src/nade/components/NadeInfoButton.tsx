import { FC } from "react";
import { FaInfo } from "react-icons/fa";
import { SquareButton } from "../../shared-components/buttons/IconButton/IconButton";

export const NadeInfoButton: FC = () => {
  return (
    <>
      <a href="#description">
        <SquareButton icon={<FaInfo />} active={false} activeColor={"teal"} />
      </a>
      <style jsx>{``}</style>
    </>
  );
};

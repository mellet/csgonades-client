import { FC } from "react";
import { FaInfo } from "react-icons/fa";
import { SquareButton } from "../../shared-components/buttons/IconButton/SquareButton";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";

export const NadeInfoButton: FC = () => {
  return (
    <>
      <div className="nade-info">
        <a href="#description">
          <Tooltip message="Description" direction="right">
            <SquareButton
              icon={<FaInfo />}
              active={false}
              activeColor={"teal"}
            />
          </Tooltip>
        </a>
      </div>
      <style jsx>{``}</style>
    </>
  );
};

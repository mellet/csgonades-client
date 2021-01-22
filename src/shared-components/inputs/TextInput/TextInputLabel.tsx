import { FC } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import styled from "styled-components";
import { DEFAULT_THEME } from "../../../core/settings/Themes";

type Props = {
  label?: string;
  required?: boolean;
};

export const TextInputLabel: FC<Props> = ({ label, required }) => {
  if (!label) {
    return null;
  }

  return (
    <StyledInputLabel>
      {label}
      {required && (
        <Popup
          content="Required"
          inverted
          position="top center"
          size="tiny"
          trigger={
            <span>
              <FaStarOfLife />
            </span>
          }
        />
      )}
    </StyledInputLabel>
  );
};

const StyledInputLabel = styled.label`
  color: ${({ theme }) => theme.colors.TEXT};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
  text-transform: uppercase;

  & > span {
    color: red;
    display: inline-block;
    font-size: 6px;
    position: relative;
    top: -3px;
    margin-left: 2px;
  }
`;

StyledInputLabel.defaultProps = DEFAULT_THEME;

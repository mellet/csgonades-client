import { FC } from "react";
import styled from "styled-components";
import { Dimensions } from "../constants/Constants";

type Props = {
  mainNav: JSX.Element;
  secondaryNav: JSX.Element;
  footer: JSX.Element;
};

export const NavigationLayout: FC<Props> = ({
  footer,
  mainNav,
  secondaryNav,
}) => {
  return (
    <>
      <NavigationLayoutWrap>
        <div className="main">{mainNav}</div>
        <div className="secondary">{secondaryNav}</div>
        <div className="footer">{footer}</div>
      </NavigationLayoutWrap>
    </>
  );
};

const NavigationLayoutWrap = styled.nav`
  position: sticky;
  top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;

  & .secondary {
    margin-top: ${Dimensions.GUTTER_SIZE}px;
  }

  .main,
  .secondary {
    background: ${({ theme }) => theme.colors.DP03};
    border-radius: ${Dimensions.BORDER_RADIUS};
    border: 1px solid ${({ theme }) => theme.colors.BORDER};
  }

  .secondary {
    border-bottom: 0;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .footer {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.BORDER};
    border-top: 0;
  }

  @media only screen and (max-width: 1200px) {
    height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
    background: ${({ theme }) => theme.colors.DP03};
    overflow-y: auto;

    .main,
    .secondary {
      margin: 0;
      background: transparent;
      border: none;
      border-radius: 0px;
    }

    .secondary {
      flex: 1;
    }

    .footer {
      border-radius: 0px;
      border: none;
    }
  }
`;

import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  id: string;
  center?: boolean;
  staticHeight?: number;
};

export const EzoicPlainPlaceholder: FC<Props> = memo(
  ({ id, center, staticHeight }) => {
    const ezoicId = `ezoic-pub-ad-placeholder-${id}`;
    const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

    useEffect(() => {
      if (!window.ezstandalone) {
        setIsAdBlockEnabled(true);
      }
    }, []);

    if (isAdBlockEnabled) {
      return null;
    }

    if (center) {
      return (
        <CenteredAdLayout id={id} center={center} staticHeight={staticHeight}>
          <div className="ez" id={ezoicId} />
        </CenteredAdLayout>
      );
    }

    return <div className="ez" id={ezoicId} />;
  }
);

const CenteredAdLayout = styled.div<Props>`
  width: 100%;
  display: flex;
  align-items: center;
  height: ${(props) => props.staticHeight || "auto"};
`;

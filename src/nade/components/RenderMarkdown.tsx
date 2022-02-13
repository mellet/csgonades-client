import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { FC } from "react";

type Props = {
  value: string;
};

export const RenderMarkdown: FC<Props> = ({ value }) => {
  return (
    <>
      <div className="markdown">
        <ReactMarkdown
          linkTarget="_blank"
          disallowedElements={["heading"]}
          skipHtml={false}
          remarkPlugins={[breaks]}
        >
          {value}
        </ReactMarkdown>
      </div>
      <style global jsx>{`
        .markdown p {
          font-size: 16px;
        }
      `}</style>
    </>
  );
};

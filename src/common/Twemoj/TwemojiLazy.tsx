import React, { memo } from "react";
import twemoji from "twemoji";

type Props = {
  emoji: any;
};

const TwemojiLazy = memo<Props>(({ emoji }) => (
  <>
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(emoji, {
          folder: "svg",
          ext: ".svg",
        }),
      }}
    />
    <style jsx global>{`
      .emoji {
        display: inline-block;
        height: 1em;
        vertical-align: -0.125em;
        width: auto;
      }
    `}</style>
  </>
));

export default TwemojiLazy;

import React, { FC } from "react";
import twemoji from "twemoji";

type Props = {
  emoji: string;
};

export const TwemojiLazy: FC<Props> = ({ emoji }) => (
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
);

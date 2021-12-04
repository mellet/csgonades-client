import React, { memo } from "react";
import dynamic from "next/dynamic";

const TweMojiLazy = dynamic(
  () =>
    import(/* webpackChunkName: "twemoji" */ "./TwemojiLazy").then(
      (mod) => mod.TwemojiLazy
    ),
  { ssr: false }
);

type Props = {
  emoji: string;
};

export const Twemoji = memo<Props>(({ emoji }) => {
  return <TweMojiLazy emoji={emoji} />;
});

import React, { memo, Suspense } from "react";
import dynamic from "next/dynamic";

const TweMojiLazy = dynamic(() => import("./TwemojiLazy"));
const isServer = typeof window === "undefined";
type Props = {
  emoji: any;
};

export const Twemoji = memo<Props>(({ emoji }) => {
  if (isServer) {
    return <span />;
  }

  return (
    <>
      <Suspense fallback={<span />}>
        <TweMojiLazy emoji={emoji} />
      </Suspense>
    </>
  );
});

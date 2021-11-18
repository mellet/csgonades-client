import { FC, memo, useEffect } from "react";

export const AdsenseCustom: FC = memo(() => {
  useEffect(() => {
    try {
      // @ts-ignore
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("Failed to init ad");
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: 300, height: 300 }}
        data-ad-client="ca-pub-2255854420599519"
        data-ad-slot="6691131972"
      ></ins>
    </>
  );
});

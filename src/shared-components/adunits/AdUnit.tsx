import { FC, memo } from "react";
import dynamic from "next/dynamic";
import { AdUnitName } from "./Adsense";
const AdUnitContent = dynamic(
  () =>
    import(/* webpackChunkName: "adunit" */ "./AdUnitContent").then(
      (mod) => mod.AdUnitContent
    ),
  {
    ssr: false,
  }
);

type Props = {
  name: AdUnitName;
  horizontalSpacing?: boolean;
};

export const AdUnit: FC<Props> = memo(({ name, horizontalSpacing }) => {
  return <AdUnitContent name={name} horizontalSpacing={horizontalSpacing} />;
});

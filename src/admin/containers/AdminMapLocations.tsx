import dynamic from "next/dynamic";
import { FC } from "react";

const CsMapView = dynamic(
  () =>
    import("../../map/components/mapview/CsMapView").then((m) => m.CsMapView),
  {
    ssr: false,
  }
);

export const AdminMapLocations: FC = () => {
  return (
    <>
      <CsMapView initCsMap="mirage" />
      <style jsx>{``}</style>
    </>
  );
};

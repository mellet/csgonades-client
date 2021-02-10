import { FC } from "react";
import { Footer } from "./NavFooter";
import { MapNav } from "./MapNav";
import { SecondaryNav } from "./SecondaryNav";
import { NavigationLayout } from "./NavigationLayout";

export const Navigation: FC = ({}) => {
  return (
    <>
      <NavigationLayout
        mainNav={<MapNav />}
        secondaryNav={<SecondaryNav />}
        footer={<Footer />}
      />
    </>
  );
};

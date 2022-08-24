import { FC } from "react";
import { Footer } from "./NavFooter";
import { SecondaryNav } from "./SecondaryNav";
import { NavigationLayout } from "./NavigationLayout";
import { MapNavAccordian } from "./MapNavAccordian";

export const Navigation: FC = ({}) => {
  return (
    <>
      <NavigationLayout
        mainNav={<MapNavAccordian />}
        secondaryNav={<SecondaryNav />}
        footer={<Footer />}
      />
    </>
  );
};

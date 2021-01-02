import { NextPage } from "next";
import { SEO } from "../common/SEO";
import { LayoutBuilder } from "../layout/LayoutBuilder";
import { HeaderDefault } from "../defaultheader/Header";
import { Navigation } from "../navigation/Navigation";
import { ContactMain } from "../contact/ContactMain";

const ContactPageContainer: NextPage = () => {
  return (
    <>
      <SEO title="Contact" canonical="/contact" />
      <LayoutBuilder
        key={"contact"}
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<ContactMain />}
      />
    </>
  );
};

export default ContactPageContainer;

import { NextPage } from "next";
import Link from "next/link";
import { useTheme } from "../core/settings/SettingsHooks";
import { SEO } from "../shared-components/SEO";
import { Dimensions } from "../constants/Constants";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { Navigation } from "../navigation/Navigation";

const PrivacyPolicyPageContainer: NextPage = () => {
  const { colors } = useTheme();

  return (
    <>
      <SEO canonical="/privacypolicy" title="Privacy Policy" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <>
            <div className="privacy-policy">
              <h1>Privacy Policy</h1>
              <p>
                At csgonades.com, the privacy of our visitors is of extreme
                importance to us. This privacy policy document outlines the
                types of personal information is received and collected by
                csgonades.com and how it is used.
              </p>

              <h2>Log Files</h2>
              <p>
                Like many other Web sites, csgonades.com makes use of log files.
                The information inside the log files includes internet protocol
                (IP) addresses, type of browser, Internet Service Provider
                (ISP), date/time stamp, referring/exit pages, and number of
                clicks to analyze trends, administer the site, track user’s
                movement around the site, and gather demographic information. IP
                addresses, and other such information are not linked to any
                information that is personally identifiable.
              </p>
              <h2>Cookies and Web Beacons</h2>
              <p>
                csgonades.com does use cookies to store information about
                visitors preferences, record user-specific information on which
                pages the user access or visit, customize Web page content based
                on visitors browser type or other information that the visitor
                sends via their browser.
              </p>
              <h2>Advertising</h2>
              <p>
                Third-party ad servers or ad networks use technology to the
                advertisements and links that appear on csgonades.com send
                directly to your browsers. They automatically receive your IP
                address when this occurs. Other technologies ( such as cookies,
                JavaScript, or Web Beacons ) may also be used by the third-party
                ad networks to measure the effectiveness of their advertisements
                and / or to personalize the advertising content that you see.
              </p>
              <p>
                csgonades.com has no access to or control over these cookies
                that are used by third-party advertisers.
              </p>
              <p>
                You should consult the respective privacy policies of these
                third-party ad servers for more detailed information on their
                practices as well as for instructions about how to opt-out of
                certain practices. csgonades.com&apos;s privacy policy does not
                apply to, and we cannot control the activities of, such other
                advertisers or web sites.
              </p>
              <h2>Security</h2>
              <p>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </p>
              <h2>Links to Other Sites</h2>
              <p>
                This Service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. Therefore, I
                strongly advise you to review the Privacy Policy of these
                websites. We have no control over and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </p>
              <h2>Children’s Privacy</h2>
              <p>
                Services do not address anyone under the age of 13. We do not
                knowingly collect personally identifiable information from
                children under 13. In the case we discover that a child under 13
                has provided us with personal information, We immediately delete
                this from our servers. If you are a parent or guardian and you
                are aware that your child has provided us with personal
                information, please contact us so that I will be able to do
                necessary actions.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Thus, you
                are advised to review this page periodically for any changes. We
                will notify you of any changes by posting the new Privacy Policy
                on this page. These changes are effective immediately after they
                are posted on this page.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions or suggestions about my Privacy
                Policy, do not hesitate to{" "}
                <Link href="/contact" as="/contact">
                  <a>contact us</a>
                </Link>
                .
              </p>
            </div>
            <style jsx>{`
              .privacy-policy {
                margin: ${Dimensions.GUTTER_SIZE}px;
                color: ${colors.TEXT};
                background: ${colors.DP01};
                padding: 20px 30px;
                border-radius: 5px;
              }
            `}</style>
          </>
        }
      />
    </>
  );
};

export default PrivacyPolicyPageContainer;

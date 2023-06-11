import { NextPage } from "next";
import Link from "next/link";
import { useTheme } from "../core/settings/useTheme";
import { SEO } from "../shared-components/SEO";
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
                At csgonades.com, we highly value the privacy of our visitors.
                This Privacy Policy document aims to provide you with clear
                information on how we collect, use, and protect your personal
                information.
              </p>
              <h2>Log Files</h2>
              <p>
                Like many other websites, csgonades.com utilizes log files to
                gather certain information. These log files may include internet
                protocol (IP) addresses, browser types, Internet Service
                Provider (ISP) details, date/time stamps, referring/exit pages,
                and the number of clicks. This data is analyzed to understand
                trends, administer the site, track user movement, and gather
                demographic information. However, please note that IP addresses
                and similar information are not linked to personally
                identifiable information.
              </p>
              <h2>Cookies and Web Beacons</h2>
              <p>
                We use cookies to store information about visitors&apos;
                preferences and to record user-specific information on which
                pages they access or visit. These cookies enable us to customize
                web page content based on visitors&apos; browser types and other
                information sent via their browsers.
              </p>
              <h2>Advertising</h2>
              <p>
                csgonades.com utilizes various third-party advertising
                platforms, including Google AdSense, to display advertisements
                on our site. These platforms may use cookies, web beacons, and
                similar technologies to serve relevant ads based on your
                browsing activities and interests. Please note that these
                technologies are controlled by the respective third-party
                advertising platforms, and csgonades.com does not have access to
                or control over the information collected by these platforms.
              </p>
              <p>
                You should consult the respective privacy policies of these
                third-party ad servers for more detailed information on their
                practices as well as for instructions about how to opt-out of
                certain practices. csgonades.com&apos;s privacy policy does not
                apply to, and we cannot control the activities of, such other
                advertisers or web sites.
              </p>
              <h2>Analytics</h2>
              <p>
                To improve user experience and understand how visitors interact
                with our website, we use Microsoft Clarity, an analytics
                service. Microsoft Clarity may collect information such as mouse
                movements, clicks, and scrolling behavior on our site. This data
                helps us analyze user behavior and optimize our website
                accordingly. Please note that all data collected by Microsoft
                Clarity is anonymized and does not contain personally
                identifiable information.
              </p>
              <h2>Embedded Content</h2>
              <p>
                csgonades.com may embed videos from YouTube or Gfycat, a
                third-party video platform. By accessing pages with embedded
                videos, you are subject to YouTube&apos;s or Gfycat&apos;s Terms
                of Service and Privacy Policy. Please review these policies to
                understand how YouTube handles your personal information.
              </p>
              <h2>Security</h2>
              <p>
                We strive to protect your Personal Information using
                commercially acceptable means. However, it is important to
                understand that no method of transmission over the internet or
                electronic storage is 100% secure and reliable. While we take
                measures to safeguard your data, we cannot guarantee absolute
                security.
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
                <Link href="/contact" as="/contact" legacyBehavior>
                  <a>contact us</a>
                </Link>
                .
              </p>
            </div>
            <style jsx>{`
              .privacy-policy {
                color: ${colors.TEXT};
                background: ${colors.DP03};
                padding: 16px;
                border-radius: 8px;
                max-width: 900px;
              }
            `}</style>
          </>
        }
      />
    </>
  );
};

export default PrivacyPolicyPageContainer;

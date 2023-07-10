import { BlogPostArticle } from "../blog/components/BlogPostArticle";
import { cs2Nades } from "../blog/ArticleData/blogPosts";
import { AdUnit } from "../shared-components/adunits/AdUnit";

export const Cs2NadesBlogPost = (): JSX.Element => {
  return (
    <>
      <BlogPostArticle data={cs2Nades}>
        <p>
          In this article, we&apos;ll explore the exciting changes and
          improvements in CS2, particularly focusing on the elimination of
          tickrate affecting nade throws between 64 and 128 tick. Additionally,
          we&apos;ll discuss the enhanced functionality we have introduced on
          our website, including the ability to switch between CS2 and CS:GO
          game modes and add nades specifically for CS2.
        </p>
        <AdUnit horizontalSpacing name="blogHorizontalFirst" />
        <h2>The Elimination of Tickrate&apos;s Impact on Nade Throws</h2>
        <p>
          One of the major distinctions between CS2 and CS:GO lies in the
          elimination of tickrate&apos;s influence on nade throws within for 64
          and 128 tick. This exciting development ensures a consistent outcome
          for nade throws, regardless of the tickrate. Say goodbye to the
          frustration of needing to know different variations for competitive
          and FaceIT games.
        </p>
        <h2>Enhanced Functionality</h2>
        <p>
          To provide an optimal user experience for both CS2 and CS:GO players,
          we have introduced several new features on our website:
        </p>
        <h3>Switch Between CS2 and CS:GO Game Modes</h3>
        <p>
          Seamlessly transition between CS2 and CS:GO game modes directly on our
          website. Whether you&apos;re exploring the new features of CS2 or
          revisiting your CS:GO roots, our website offers the flexibility to
          cater to your gaming preferences.
        </p>
        <h3>Tickrate Independence for CS2 Nades</h3>
        <p>
          Bid farewell to tickrate concerns when it comes to CS2 nades. With
          this update, tickrate is no longer a factor affecting the outcome of
          your nade throws. So we have removed the requirement to specify
          tickrates when adding a CS2 nades, and you will no longer se tickrate
          as a filter when browsing for nades.
        </p>
        <h3>Nade Submission for CS2</h3>
        <p>
          As CS2 continues its testing phase, we encourage players with access
          to the game to contribute to the community&apos;s knowledge pool.
          Share your expertise by recording videos of nade throws on the maps
          currently in rotation and submitting them on our website. Together, we
          can build a comprehensive resource of CS2 nades and help players
          elevate their gameplay.
        </p>

        <AdUnit horizontalSpacing name="blogHorizontalSecond" />

        <p>
          CS2&apos;s imminent release has created a buzz among Counter-Strike
          enthusiasts, and we are excited to support the community with our
          updated website functionalities. With the removal of tickrate&apos;s
          impact on nade throws, CS2 opens up new possibilities for precise and
          consistent gameplay. Embrace the seamless transition between CS2 and
          CS:GO game modes on our website, and contribute to the growing
          collection of CS2 nades by submitting your videos.
        </p>
      </BlogPostArticle>
      <style jsx>{``}</style>
    </>
  );
};

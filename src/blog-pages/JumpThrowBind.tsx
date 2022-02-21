import { FC } from "react";
import { blogJumpthrowBind } from "../blog/ArticleData/blogPosts";
import { BlogCodeSnippet } from "../blog/components/BlogCodeSnippet";
import { BlogPostArticle } from "../blog/components/BlogPostArticle";
import { PageLink } from "../shared-components/PageLink";
import { BlogNadeItem } from "../blog/components/BlogNadeItem";
import { NadeBlogList } from "../blog/components/NadeBlogList";
import { AdUnit } from "../shared-components/adunits/AdUnit";

export const JumpThrowBindBlogMain: FC = () => {
  return (
    <>
      <BlogPostArticle data={blogJumpthrowBind}>
        <p>
          If you already know what the jumpthrow bind is, skip to the end where
          you can copy the bind.
        </p>

        <AdUnit horizontalSpacing name="blogHorizontalFirst" />

        <h2>Is jumpthrow bind legal?</h2>
        <p>
          <a href="https://www.pcgamesn.com/counter-strike-global-offensive/jumpthrow-bind">
            Yes
          </a>
          , mostly. In matchmaking, ESEA, FACEIT and most pro tournaments the
          jump throw bind is legal to use. However, if your playing on some pro
          or semi-pro tournament, double-check their rules to be sure you’re not
          breaking any rules.
        </p>
        <h2>What is the jumpthrow bind?</h2>
        <p>
          The jumpthrow bind is a small script you can bind to one of your
          buttons. It allows you with one click of a button to perform multiple
          actions. In the case of the jumpthrow bind, these actions are jumping
          and releasing the left mouse button at the same time. So why is this
          so useful? It allows you to throw long-range with the same outcome
          every time. If you try to jump and release the nade yourself without
          the bind, you will see some variations for your throws as your not a
          robot, and you probably release the mouse button at slightly different
          times.
        </p>

        <h2>Setting up jumpthrow bind</h2>

        <h3>Simple keybind</h3>
        <p>
          If you don&apos;t want to mess around with your config files, use this
          simple bind:
        </p>
        <BlogCodeSnippet code={'bind "X" "+jump; -attack; -jump"'} />
        <p>
          <em>Change out X with your prefered key.</em>
        </p>

        <AdUnit horizontalSpacing name="blogHorizontalSecond" />

        <h3>Alias bind, autoexec</h3>
        <p>
          If you don’t have a autoexec config file allready, you can follow{" "}
          <a href="https://www.dailyesports.gg/how-to-create-a-custom-csgo-config-autoexec-cfg/">
            this guide
          </a>{" "}
          to set it up.
        </p>
        <p>
          Paste the following into your autoexec file, change out KEY with
          whatever button you prefer:
        </p>
        <BlogCodeSnippet
          code={
            'alias "+jumpthrow" "+jump;-attack;-attack2"\nalias "-jumpthrow" "-jump"\nbind "KEY" "+jumpthrow"'
          }
        />

        <h2>Many nades require jumpthrow bind to be consistent</h2>

        <p>
          Some nades require you to use the jumpthrow bind, otherwise it wont be
          very consistent. Below are a couple nades that become a lot easier to
          throw.
        </p>

        <NadeBlogList>
          <BlogNadeItem nadeSlug="smoke-mid-window-from-t-spawn" />
          <BlogNadeItem nadeSlug="mirage-smoke-snipers-nest-from-t-spawn" />
          <BlogNadeItem nadeSlug="smoke-monster-from-ct-spawn-overpass" />
          <BlogNadeItem nadeSlug="smoke-monster-from-ct" />
          <BlogNadeItem nadeSlug="dust2-smoke-b-window-from-upper-tunnel" />
        </NadeBlogList>

        <h2>How to use jumpthrow bind</h2>
        <p>
          Take out your smoke, hold down either your left, right or both mouse
          buttons. Then press the button you selected for your bind. The script
          will jump, and release both mouse buttons for you.
        </p>

        <b>Normal range jumpthrow</b>
        <p>
          Hold down <em>left mouse button</em>, click the bind.
        </p>

        <b>Short range jumpthrow (only for alias bind)</b>
        <p>
          Holde down <em>right mouse button</em>, click the bind.
        </p>

        <b>Medium range jumpthrow (only for alias bind)</b>
        <p>
          Holde down <em>both mouse button</em>, click the bind.
        </p>

        <AdUnit horizontalSpacing name="blogHorizontalThird" />

        <h2>Conclusion</h2>
        <p>
          Now that you got your jumpthrow bind is set up, head over to your
          favorite map and find some nades that use the jumpthrow bind.
        </p>

        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/FQa3SL6IlrE"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h2>Read more</h2>
        <p>
          <PageLink href="/blog/tickrate-and-jumpthrow-bind">
            <span>Why Jumpthrow Smokes Are Different on 64 and 128 Tick</span>
          </PageLink>
        </p>
      </BlogPostArticle>
      <style jsx>{`
        .a-tag {
          margin: 30px 0px;
        }

        .video-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          margin-bottom: 30px;
        }

        .video-container::after {
          padding-top: 56.25%;
          display: block;
          content: "";
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .cta-map {
          background: #299464;
          border-radius: 10px;
          color: white;
          display: block;
          margin: 30px auto;
          padding: 15px 30px;
          width: 200px;
          text-align: center;
          font-weight: 500;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

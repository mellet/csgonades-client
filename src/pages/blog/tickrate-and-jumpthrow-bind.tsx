import { FC } from "react";
import { BlogCodeSnippet } from "../../blog/BlogCodeSnippet";
import { BlogPost } from "../../blog/BlogPost";
import { BlogPostArticle } from "../../blog/BlogPostArticle";
import { EzoicPlaceholder } from "../../common/adunits/EzoicPlaceholder";

export const blogTickrateAndJumpthrow: BlogPost = {
  title: "Why Jumpthrow Smokes Are Different on 64 and 128 Tick",
  slug: "tickrate-and-jumpthrow-bind",
  imageUrl: "/blogimg/jump.jpg",
  thumbnailUrl: "/blogimg/jump_thumb.jpg",
  createdAt: "2020-03-15T07:51:30.196Z",
  intro:
    "You just set up jumpthrow bind and practised offline for a sick smoke for Mirage. Your friends ask you to join a game on FACEIT, and you throw your smoke, but it missed! What the heck? You just tried it out... Why did this happen?",
};

const TickRateAndJumpthrowBindBlogPost: FC = () => {
  return (
    <>
      <BlogPostArticle data={blogTickrateAndJumpthrow}>
        <p>
          Game servers have different rates at which they communicate with your
          game, called tickrate. This slight timing difference affects the
          movement speed the server thinks you have while jumping, giving you
          slightly different results on 64 and 128 tick servers. See the video
          below.
        </p>

        <h2>What is tickrate?</h2>
        <p>
          Tick rate is a networking term for game servers. It tells us how often
          our game, the client, communicates with the game server hosted by
          Valve, or third party providers.
        </p>
        <p>
          In Counter-Strike Global Offensive game servers are either 64 tick or
          128 tick. For matchmaking, Valve has set the tick rate to 64, to save
          money... They can then run the servers on cheaper hardware.
          Professional tournaments and most external services like{" "}
          <a href="https://play.esea.net/">ESEA</a>,{" "}
          <a href="https://www.faceit.com/">FACEIT</a>, and{" "}
          <a href="https://popflash.site/">PopFlash</a> all use 128 tick. So
          depending on what you play the most on, you know what throws will work
          for you and which won&apos;t.
        </p>

        <div className="a-tag">
          <EzoicPlaceholder id="189" />
        </div>

        <h2>What is the jump throw bind?</h2>
        <p>
          The jump throw bind is a small script you can bind to one of your
          buttons. It allows you with one click of a button to perform multiple
          actions. In the case of the jump throw bind, these actions are jumping
          and releasing the left mouse button at the same time.
        </p>
        <p>
          So why is this so useful? It allows you to throw long-range with the
          same outcome every time. If you try to jump and release the nade
          yourself without the bind, you will see some variations for your
          throws as your not a robot, and you probably release the mouse button
          at slightly different times.
        </p>
        <h2>Why does the tickrate affect the jump throw bind?</h2>
        <p>
          As we have explained, the jumpthrow bind removes the need for you to
          try to time releasing the nade at the same height. We have now
          offloaded that responsibility to the game.
        </p>
        <p>
          However, this comes at a cost. The bind will send two commands to the
          game server. First, it will send a jump command, then a release
          command.
        </p>

        <p>
          Since the server and client communicate less frequently on 64 tick,
          the server will receive slightly different movement speeds during your
          jump. This is the reason your jumpthrow bind will have different
          outcomes on 64 tick and 128 tick. Because of the tickrate, the release
          of the grenade will have different speeds on 64 and 128 tick.
        </p>
        <p>
          In the video below, you can see that the release happens at slightly
          different heights on the two tickrates.
        </p>

        <div className="a-tag">
          <EzoicPlaceholder id="190" />
        </div>

        <div
          style={{
            position: "relative",
            paddingBottom: "calc(56.25% + 44px)",
          }}
        >
          <iframe
            src="https://gfycat.com/ifr/TeemingUnnaturalBordercollie?hd=1"
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            allowFullScreen
          ></iframe>
        </div>
        <br />

        <p>
          Using the jumpthrow bind will give you the same result every time, if
          your playing on the same tickrate. If you play on both matchmaking and
          FACEIT, you are going to need to learn the same nade for both
          tickrates, if it uses a jumpthrow bind.
        </p>

        <p>
          Here is also the YouTuber{" "}
          <a href="https://www.youtube.com/channel/UCPKbW1excf-E7Tmwom1AgkQ">
            BananaGaming
          </a>{" "}
          explaining the same concept:
        </p>

        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/rOTtmSrtXtI"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h2>Bonus: Variations of the jump throw bind</h2>
        <p>
          There are variations of the jump throw bind. More specifically, there
          are three. Let’s see them all and how they differ.
        </p>
        <h3>Standard</h3>
        <BlogCodeSnippet
          code={`alias "+jumpthrow" "+jump;-attack";\nalias "-jumpthrow" "-jump";\nbind x "+jumpthrow";`}
        />
        <p>
          The Standard jump throw bind. It will jump and release the left mouse
          button and is the most basic variation that most people use.
        </p>
        <h3>With both mouse buttons</h3>
        <BlogCodeSnippet
          code={`alias "+jumpthrow" "+jump;-attack;-attack2";\nalias "-jumpthrow" "-jump";\nbind x "+jumpthrow"`}
        ></BlogCodeSnippet>
        <p>
          Personally, I use this variation, as it allows you to do a jump throw
          with your right mouse button down for a short-range jump throw. Or for
          some particular situations, I hold down both mouse buttons and click
          the bind, giving me a medium-range jump throw result. Even with this
          slight modification to the bind, It will still work correctly with the
          normal left-click throw as well.
        </p>
        <h3>Extra range</h3>
        <BlogCodeSnippet
          code={`alias "+jumpthrow" "+jump;-attack;+forward";\nalias "-jumpthrow" "-jump;-forward";\nbind x "+jumpthrow;`}
        />
        <p>
          Last but not least, we have the extra range jump throw bind that, in
          addition to doing a jump and release, takes a single step forward,
          giving it some extra distance. This is the least used one, and I would
          not recommend it if you&apos;re looking at guides as they 99% of the
          time use one of the other two.
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
      `}</style>
    </>
  );
};

export default TickRateAndJumpthrowBindBlogPost;

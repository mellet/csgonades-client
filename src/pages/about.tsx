import { NextPage } from "next";
import { useTheme } from "../core/settings/useTheme";
import { SEO } from "../shared-components/SEO";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { Navigation } from "../navigation/Navigation";

const AboutPageContainer: NextPage = () => {
  const { colors } = useTheme();

  return (
    <>
      <SEO title="About" canonical="/about" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <div className="about">
            <h1>About CSGO Nades</h1>
            <h2>The story</h2>
            <p>
              Welcome to CSGONades: Your Go-To Hub for Easy Access to an
              Extensive Collection of Grenades!
            </p>

            <p>
              Established in 2016, CSGONades was born out of my passion for
              Counter-Strike and my drive as a computer science student. As an
              avid player, I found myself constantly searching for new smokes
              and wanting to share them with my teammates in the simplest way
              possible.
            </p>

            <p>
              In the dynamic world of matchmaking, where teammates come and go,
              it became essential to have a quick and efficient method to teach
              essential nades for executing bomb site strategies. That&apos;s
              why I created CSGONades. Now, with just a click of a link, anyone
              can learn a nade within seconds during rounds, allowing us to
              seamlessly continue our gameplay.
            </p>

            <p>
              Join our thriving community and experience the convenience of
              easily accessible nades, empowering you and your team to execute
              flawless strategies. Let&apos;s enhance our gameplay together and
              make every round count!
            </p>

            <h2>My vision</h2>
            <p>
              Discover the Ultimate Grenade Arsenal: Empowering Beginners and
              Seasoned Players Alike!
            </p>
            <p>
              Whether you&apos;re a newcomer or a seasoned Counter-Strike
              player, our site is designed to be your go-to resource.
            </p>
            <p>
              If you&apos;re new to the game, unlock the power of fundamental
              grenades that every player should master. Blindside your enemies
              with an easy pop flash, shroud them in smoke to hinder their
              vision, or unleash chaos with a well-placed molotov.
            </p>
            <p>
              Seize the advantage, elevate your gameplay, and witness your
              ascent through the ranks. Expand your skill set by sharing new
              grenades with your teammates and watch your coordination soar.
              Together, orchestrate a perfectly executed smoke assault on a
              bombsite or unleash your creativity by crafting unique strategies
              using the vast array of grenades available on our website.
            </p>
            <p>
              Join us today and embark on an exciting journey of explosive
              tactics, relentless improvement, and unparalleled success!
            </p>
          </div>
        }
      />

      <style jsx>{`
        .about {
          padding: 16px;
          color: ${colors.TEXT};
          background: ${colors.DP03};
          border-radius: 8px;
          max-width: 900px;
        }
      `}</style>
    </>
  );
};

export default AboutPageContainer;

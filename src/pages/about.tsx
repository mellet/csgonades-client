import { NextPage } from "next";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SEO } from "../common/SEO";
import { Dimensions } from "../constants/Constants";
import { LayoutBuilder } from "../layout/LayoutBuilder";
import { HeaderDefault } from "../defaultheader/Header";
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
              CSGONades was created in 2016 to collect a large collection of
              grenades that can be found with ease.
            </p>
            <p>
              I am Mellet and I am an avid Counter-Strike player and a computer
              science student. During my matchmaking games, I wanted to be able
              to find new smokes and teach them to my teammates in a simple way.
            </p>
            <p>
              With my friends, we regularly rotate in new teammates and it often
              happens that someone does not know how to throw a nade that we
              need to execute a strategy for a bomb site. Now, with just a link
              to the nade, they can learn it in a few seconds between rounds and
              we can get on with our game.
            </p>
            <h2>My vision</h2>
            <p>
              I wanted to make this site useful for both beginners and
              experienced players.
            </p>
            <p>
              If you are new to Counter-Strike, this site can help you learn the
              basic grenades that every player should know. Try to blind your
              enemies with an easy pop flash, block off their vision with a nice
              smoke or set them on fire with a quick molotov.
            </p>
            <p>
              Gain an edge over your opponents, teach new grenades to your
              teammates and watch yourself rise through the ranks. If you are
              already good at the game, try to coordinate a smoke execute onto a
              bombsite together with your teammates or invent your strategies
              with the use of some of the grenades you can find on this website.
            </p>
          </div>
        }
      />

      <style jsx>{`
        .about {
          margin: ${Dimensions.GUTTER_SIZE}px;
          padding: 20px 30px;
          color: ${colors.TEXT};
          background: ${colors.DP02};
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default AboutPageContainer;
